using AzureArtifact.Api.Abstractions.Common.Extensions;
using AzureArtifact.Api.Abstractions.Interfaces.Repositories;
using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Abstractions.Transports.Token;
using AzureArtifact.Api.Adapters.Adapters.Teams;
using AzureArtifact.Api.Core.Services.Internal;
using Microsoft.Extensions.Logging;

namespace AzureArtifact.Api.Core.Services;

public class ManagementService : BaseService, IManagementService
{
	private readonly IArtifactService _artifactService;
	private readonly ILogger<ManagementService> _logger;
	private readonly IProjectRepository _projectRepository;
	private readonly TeamsAdapter _teamsAdapter;

	public ManagementService(IArtifactService artifactService, IProjectRepository projectRepository, TeamsAdapter teamsAdapter, ILogger<ManagementService> logger,
		ITokenRepository tokenRepository) : base(tokenRepository, logger)
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

		var organisation = "coexya-swl-sante";
		var token = await RequiredToken(organisation);

		var artifactDict = await _artifactService.GetAllWithNewVersion(organisation);

		await Parallel.ForEachAsync(artifactDict, async (artifact, _) => await HandleArtifactNewVersion(artifact, token));

		logger.Exit();
	}

	private async Task HandleArtifactNewVersion(KeyValuePair<Artifact, string> pair, Token token)
	{
		var artifact = pair.Key;
		var newVersion = pair.Value;

		var logger = _logger.Enter(Log.Format(artifact.Id));

		var maintainers = await _projectRepository.GetMaintainers(artifact.Notifies);

		artifact.LatestVersion = newVersion;
		await _artifactService.Update(artifact.Id, artifact);

		await _teamsAdapter.Notify(token.Webhook, artifact, maintainers);

		logger.Exit();
	}
}