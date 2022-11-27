using AzureArtifact.Api.Abstractions.Common.Extensions;
using AzureArtifact.Api.Abstractions.Interfaces.Repositories;
using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Adapters.Adapters;
using AzureArtifact.Api.Core.Assemblers;
using AzureArtifact.Api.Core.Services.Internal;
using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;

namespace AzureArtifact.Api.Core.Services;

public class ArtefactService : BaseService, IArtefactService
{
	private readonly ArtifactAssembler _artifactAssembler = new();
	private readonly IArtifactRepository _artifactRepository;
	private readonly AzureDevopsAdapter _devopsAdapter;
	private readonly ILogger<ArtefactService> _logger;

	public ArtefactService(ITokenRepository tokenRepository, IArtifactRepository artifactRepository, ILogger<ArtefactService> logger, AzureDevopsAdapter devopsAdapter) : base(tokenRepository, logger)
	{
		_artifactRepository = artifactRepository;
		_logger = logger;
		_devopsAdapter = devopsAdapter;
	}


	public async Task<Artifact> Add(ArtifactInfo info, Version version)
	{
		var logger = _logger.Enter($"{Log.Format(info)} {Log.Format(version)}");

		var entity = await _artifactRepository.Add(info, version);
		var artifact = _artifactAssembler.Convert(entity);

		logger.Exit();
		return artifact;
	}

	public async Task<List<Artifact>> GetAll()
	{
		var logger = _logger.Enter();

		var entities = await _artifactRepository.GetAll();
		var artifacts = _artifactAssembler.Convert(entities);

		logger.Exit();
		return artifacts;
	}

	public async Task<Dictionary<ArtifactInfo, Version>> GetAllWithNewVersion()
	{
		var logger = _logger.Enter();
		var entities = await _artifactRepository.GetAll();

		var token = await RequiredToken();

		var newArtifacts = new ConcurrentDictionary<Artifact, Version>();

		await Parallel.ForEachAsync(entities, async (entity, _) =>
		{
			var artifact = await _devopsAdapter.GetArtifact(new ArtifactInfo
			{
				Name = entity.Name,
				FeedId = entity.FeedId,
				Organisation = entity.Organisation
			}, token.Pat);

			if (artifact == default)
			{
				logger.Error($"Impossible de récupérer la dernière version de l'artéfact {entity.Info}");
				return;
			}

			var latestVersion = artifact.Versions.First(version => version.IsLatest).Version;
			if (latestVersion != entity.LatestVersion) newArtifacts[_artifactAssembler.Convert(entity)] = latestVersion;
		});


		logger.Exit();

		return newArtifacts.ToDictionary(pair => new ArtifactInfo
		{
			Name = pair.Key.Name,
			Organisation = pair.Key.Organisation,
			FeedId = pair.Key.FeedId
		}, pair => pair.Value);
	}

	public async Task Delete(Guid id)
	{
		var logger = _logger.Enter(Log.Format(id));

		await _artifactRepository.Delete(id);

		logger.Exit();
	}
}