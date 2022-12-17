using AzureArtifact.Api.Abstractions.Common.Extensions;
using AzureArtifact.Api.Abstractions.Interfaces.Repositories;
using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Adapters.Adapters.Teams;
using Microsoft.Extensions.Logging;

namespace AzureArtifact.Api.Core.Services;

public class ManagementService : IManagementService
{
	private const string Webhook
		= "https://coexya.webhook.office.com/webhookb2/c71a3bf4-db74-4d03-a2c1-ff595809d6a1@32b355cf-5acf-45e5-8750-21a4b1def0ea/IncomingWebhook/52da936393ca4a6ba69a6c99b5d63dca/956bd768-c985-411b-84c8-26e9e73fec74";

	private readonly IArtifactService _artifactService;
	private readonly ILogger<ManagementService> _logger;
	private readonly IProjectRepository _projectRepository;
	private readonly TeamsAdapter _teamsAdapter;

	public ManagementService(IArtifactService artifactService, IProjectRepository projectRepository, TeamsAdapter teamsAdapter, ILogger<ManagementService> logger)
	{
		_artifactService = artifactService;
		_projectRepository = projectRepository;
		_teamsAdapter = teamsAdapter;
		_logger = logger;
	}

	public async Task WatchChanged()
	{
		_logger.Enter();

		var periodicTimer = new PeriodicTimer(TimeSpan.FromSeconds(10));
		while (await periodicTimer.WaitForNextTickAsync()) await Run();
	}

	private async Task Run()
	{
		var logger = _logger.Enter();

		var artifactDict = await _artifactService.GetAllWithNewVersion("coexya-swl-sante");

		await Parallel.ForEachAsync(artifactDict, async (artifact, token) => await HandleArtifactNewVersion(artifact));

		logger.Exit();
	}

	private async Task HandleArtifactNewVersion(KeyValuePair<Artifact, string> pair)
	{
		var artifact = pair.Key;
		var newVersion = pair.Value;

		var logger = _logger.Enter(Log.Format(artifact.Id));

		var maintainers = await _projectRepository.GetMaintainers(artifact.Notifies);

		artifact.LatestVersion = newVersion;
		await _artifactService.Update(artifact.Id, artifact);

		await _teamsAdapter.Notify(Webhook, artifact, maintainers);

		logger.Exit();
	}
}