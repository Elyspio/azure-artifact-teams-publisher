using AzureArtifact.Api.Abstractions.Common.Extensions;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Abstractions.Transports.User;
using Microsoft.Extensions.Logging;
using System.Text;

namespace AzureArtifact.Api.Adapters.Adapters.Teams;

public class TeamsAdapter
{
	private readonly ILogger<TeamsAdapter> _logger;

	public TeamsAdapter(ILogger<TeamsAdapter> logger)
	{
		_logger = logger;
	}

	public async Task Notify(string webhook, Artifact artifact, Dictionary<ArtifactRepositoryId, List<UserData>> usersMap)
	{
		var logger = _logger.Enter($"{Log.Format(artifact.Name)} {Log.Format(artifact.LatestVersion)}");

		var builder = new TeamsMessageBuilder();

		builder
			.AddText($"Nouvelle version de {artifact.Name}", TextBlockSize.Larger)
			.AddDictionary(new()
			{
				{
					"Version", artifact.LatestVersion
				}
			})
			.AddText("Projets impactés : ", isSubtle: true);

		var relatedProjectDict = usersMap.ToDictionary(
			pair => pair.Key.Repository,
			pair => string.Join(", ", pair.Value.Select(user => builder.Stringify(user)))
		);

		builder.AddDictionary(relatedProjectDict)
			.AddOpenLinkAction(
				"Ouvrir dans Azure DevOps",
				$"https://dev.azure.com/{artifact.Organisation}/Templates%20SARA/_packaging?_a=package&feed={artifact.Feed}&package={artifact.Name}&protocolType={artifact.Protocol}&version={artifact.LatestVersion}"
			);

		var json = builder.Build();

		using var client = new HttpClient();

		var response = await client.PostAsync(webhook, new StringContent(json, Encoding.UTF8, "application/json"));

		response.EnsureSuccessStatusCode();

		logger.Exit();
	}
}