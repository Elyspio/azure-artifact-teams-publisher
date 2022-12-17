using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Abstractions.Transports.User;
using Microsoft.Extensions.Logging;
using System.Text;

namespace AzureArtifact.Api.Adapters.Adapters.Teams;

public class TeamsAdapter
{
	private ILogger<TeamsAdapter> _logger;

	public TeamsAdapter(ILogger<TeamsAdapter> logger)
	{
		_logger = logger;
	}

	public async Task Notify(string webhook, Artifact artifact, Dictionary<ArtifactRepositoryId, List<UserData>> usersMap)
	{
		var builder = new TeamsMessageBuilder();

		builder
			.AddText($"Nouvelle version de **{artifact.Name}**", TextBlockSize.Larger)
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

		builder.AddDictionary(relatedProjectDict);

		var json = builder.Build();

		using var client = new HttpClient();

		var response = await client.PostAsync(webhook, new StringContent(json, Encoding.UTF8, "application/json"));

		response.EnsureSuccessStatusCode();
	}
} 