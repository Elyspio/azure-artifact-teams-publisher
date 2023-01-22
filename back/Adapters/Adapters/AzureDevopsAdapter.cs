using AzureArtifact.Api.Abstractions.Common.Extensions;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Abstractions.Transports.Project;
using AzureArtifact.Api.Abstractions.Transports.Token;
using AzureArtifact.Api.Adapters.Types.Requests;
using AzureArtifact.Api.Adapters.Types.Responses;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.TeamFoundation.Common;
using Newtonsoft.Json;
using System.Collections.Concurrent;
using System.Text;
using System.Web;
using Directory = AzureArtifact.Api.Adapters.Types.Responses.Directory;

namespace AzureArtifact.Api.Adapters.Adapters;

public class AzureDevopsAdapter
{
	private readonly IMemoryCache _cache;
	private readonly ILogger<AzureDevopsAdapter> _logger;

	public AzureDevopsAdapter(ILogger<AzureDevopsAdapter> logger, IMemoryCache cache)
	{
		_logger = logger;
		_cache = cache;
	}

	public async Task<RawArtifact?> GetArtifact(ArtifactInfo info, string pat)
	{
		// Connect to Azure DevOps Services

		var logger = _logger.Enter($"{Log.Format(info.Organisation)} {Log.Format(info.Feed)} {Log.Format(info.Name)} {Log.Format(pat.IsNullOrEmpty())}");
		using var client = GetAzureClient(pat);

		var response = await client.GetAsync(
			$" https://feeds.dev.azure.com/{info.Organisation}/_apis/Packaging/Feeds/{info.Feed}/Packages?packageNameQuery={info.Name}&top=100&includeDeleted=true&includeAllVersions=true"
		);

		var content = await response.Content.ReadAsStringAsync();

		response.EnsureSuccessStatusCode();


		var artifacts = JsonConvert.DeserializeObject<AzureArtifacts>(content) ?? new AzureArtifacts();

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
			Options = new()
			{
				MinResults = 1,
				MaxResults = 100
			},
			Properties = new()
			{
				"DisplayName",
				"Mail"
			},
			IdentityTypes = new()
			{
				"user"
			},
			OperationScopes = new()
			{
				"ims"
			}
		});


		var content = await response.Content.ReadAsStringAsync();

		response.EnsureSuccessStatusCode();

		var result = JsonConvert.DeserializeObject<GetAzureUsersResponse>(content);

		return result!.Results[0].Identities.Where(user => user.OriginDirectory == Directory.Aad).ToList();
	}


	public async Task<List<Project>> GetProjects(Config config)
	{
		using var client = GetAzureClient(config.Pat);

		var response = await client.GetAsync("https://dev.azure.com/coexya-swl-sante/_apis/projects");

		var content = await response.Content.ReadAsStringAsync();

		response.EnsureSuccessStatusCode();

		var rawProjects = JsonConvert.DeserializeObject<AzureGetProjectsResponse>(content)!;
		var projects = new ConcurrentBag<Project>();

		await Parallel.ForEachAsync(rawProjects.Value, async (project, cancelToken) =>
		{
			var repoResponse = await client.GetAsync($"https://dev.azure.com/coexya-swl-sante/{project.Id}/_apis/git/repositories", cancelToken);
			var repoContent = await repoResponse.Content.ReadAsStringAsync(cancelToken);
			repoResponse.EnsureSuccessStatusCode();

			var repositories = JsonConvert.DeserializeObject<AzureGetRepositoryResponse>(repoContent)!.Value;

			projects.Add(new()
			{
				Organisation = config.Organisation,
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
	private HttpClient GetAzureClient(string pat)
	{
		var client = new HttpClient();
		client.DefaultRequestHeaders.Accept.Add(new("application/json"));
		client.DefaultRequestHeaders.Authorization = new("Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes($"{""}:{pat}")));
		return client;
	}

	public async Task<List<RawArtifact>> SearchArtifacts(string query, string feed, Config config)
	{
		using var client = GetAzureClient(config.Pat);

		var qs = $"packageNameQuery={HttpUtility.UrlEncode(query)}&includeDescription=true&%24top=1000&includeDeleted=true";
		var response = await client.GetAsync($"https://feeds.dev.azure.com/coexya-swl-sante/_apis/Packaging/Feeds/{feed}/Packages?{qs}");

		var content = await response.Content.ReadAsStringAsync();

		response.EnsureSuccessStatusCode();

		var data = JsonConvert.DeserializeObject<AzureArtifacts>(content)!;

		return data.Value;
	}

	public async Task<List<AzureGetFeedsResponse.AzureFeed>> GetArtifactFeeds(Config config)
	{
		const string key = "feeds";

		if (_cache.TryGetValue(key, out List<AzureGetFeedsResponse.AzureFeed> feeds)) return feeds;

		using var client = GetAzureClient(config.Pat);

		var response = await client.GetAsync("https://feeds.dev.azure.com/coexya-swl-sante/_apis/Packaging/Feeds");

		var content = await response.Content.ReadAsStringAsync();

		response.EnsureSuccessStatusCode();

		feeds = JsonConvert.DeserializeObject<AzureGetFeedsResponse>(content)!.Value;

		_cache.Set(key, feeds, TimeSpan.FromMinutes(30));

		return feeds;
	}
}