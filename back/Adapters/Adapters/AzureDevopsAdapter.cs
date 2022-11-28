﻿using AzureArtifact.Api.Abstractions.Common.Extensions;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Abstractions.Transports.Project;
using AzureArtifact.Api.Adapters.Types.Requests;
using AzureArtifact.Api.Adapters.Types.Responses;
using Microsoft.Extensions.Logging;
using Microsoft.TeamFoundation.Common;
using Newtonsoft.Json;
using System.Collections.Concurrent;
using System.Net.Http.Headers;
using System.Text;
using Directory = AzureArtifact.Api.Adapters.Types.Responses.Directory;

namespace AzureArtifact.Api.Adapters.Adapters;

public class AzureDevopsAdapter
{
	private readonly ILogger<AzureDevopsAdapter> _logger;

	public AzureDevopsAdapter(ILogger<AzureDevopsAdapter> logger)
	{
		_logger = logger;
	}

	public async Task<RawArtifact?> GetArtifact(ArtifactInfo info, string pat)
	{
		// Connect to Azure DevOps Services

		var logger = _logger.Enter($"{Log.Format(info.Organisation)} {Log.Format(info.FeedId)} {Log.Format(info.Name)} {Log.Format(!pat.IsNullOrEmpty())}");
		using var client = GetAzureClient(pat);

		var responseBody = await client.GetStringAsync(
			$" https://feeds.dev.azure.com/{info.Organisation}/_apis/Packaging/Feeds/{info.FeedId}/Packages?packageNameQuery={info.Name}&includeDescription=true&%24top=100&includeDeleted=true"
		);


		var artifacts = JsonConvert.DeserializeObject<AzureArtifacts>(responseBody) ?? new AzureArtifacts();

		var azureArtifact = artifacts.Value.FirstOrDefault(artifact => artifact.Name == info.Name);

		logger.Exit();

		return azureArtifact;
	}


	public async Task<List<Identity>> GetIdentities(string nameOrEmail, string pat)
	{
		using var client = GetAzureClient(pat);
		var response = await client.PostAsJsonAsync("https://dev.azure.com/coexya-swl-sante/_apis/IdentityPicker/Identities?api-version=5.0-preview.1", new GetAzureUsersRequest
		{
			Query = nameOrEmail,
			Options = new Options
			{
				MinResults = 1,
				MaxResults = 100
			},
			Properties = new List<string>
			{
				"DisplayName",
				"Mail"
			},
			IdentityTypes = new List<string>
			{
				"user"
			},
			OperationScopes = new List<string>
			{
				"ims"
			}
		});


		var content = await response.Content.ReadAsStringAsync();

		response.EnsureSuccessStatusCode();

		var result = JsonConvert.DeserializeObject<GetAzureUsersResponse>(content);

		return result!.Results[0].Identities.Where(user => user.OriginDirectory == Directory.Aad).ToList();
	}


	public async Task<List<Project>> GetProjects(string pat)
	{
		using var client = GetAzureClient(pat);

		var response = await client.GetAsync("https://dev.azure.com/coexya-swl-sante/_apis/projects");

		var content = await response.Content.ReadAsStringAsync();

		response.EnsureSuccessStatusCode();

		var rawProjects = JsonConvert.DeserializeObject<AzureGetProjectsResponse>(content)!;
		var projects = new ConcurrentBag<Project>();

		await Parallel.ForEachAsync(rawProjects.Value, async (project, token) =>
		{
			var repoResponse = await client.GetAsync($"https://dev.azure.com/coexya-swl-sante/{project.Id}/_apis/git/repositories", token);
			var repoContent = await repoResponse.Content.ReadAsStringAsync(token);
			repoResponse.EnsureSuccessStatusCode();

			var repositories = JsonConvert.DeserializeObject<AzureGetRepositoryResponse>(repoContent)!.Value;

			projects.Add(new Project
			{
				IdAzure = project.Id,
				Name = project.Name,
				Repositories = repositories.Select(repo => new Repository
				{
					Id = repo.Id,
					Name = repo.Name
				}).ToList()
			});
		});

		return projects.ToList();
	}


	/// <summary>
	///     Créé un HttpClient pouvant communiquer avec les apis Azure Devops
	/// </summary>
	/// <param name="pat"></param>
	/// <returns></returns>
	private static HttpClient GetAzureClient(string pat)
	{
		var client = new HttpClient();
		client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
		client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes($"{""}:{pat}")));
		return client;
	}
}