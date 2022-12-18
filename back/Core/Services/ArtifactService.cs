using AzureArtifact.Api.Abstractions.Common.Extensions;
using AzureArtifact.Api.Abstractions.Interfaces.Hubs;
using AzureArtifact.Api.Abstractions.Interfaces.Repositories;
using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Abstractions.Transports.Enums;
using AzureArtifact.Api.Adapters.Adapters;
using AzureArtifact.Api.Core.Assemblers;
using AzureArtifact.Api.Core.Services.Internal;
using AzureArtifact.Api.Sockets.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;
using System.Text.RegularExpressions;

namespace AzureArtifact.Api.Core.Services;

public class ArtifactService : BaseService, IArtifactService
{
	private readonly ArtifactAssembler _artifactAssembler = new();
	private readonly IArtifactRepository _artifactRepository;
	private readonly AzureDevopsAdapter _devopsAdapter;
	private readonly IList<Regex> _ignoredVersions;
	private readonly ILogger<ArtifactService> _logger;
	private readonly IHubContext<UpdateHub, IUpdateHub> _updateHub;

	public ArtifactService(ITokenRepository tokenRepository, IArtifactRepository artifactRepository, ILogger<ArtifactService> logger, AzureDevopsAdapter devopsAdapter,
		IHubContext<UpdateHub, IUpdateHub> updateHub, IConfiguration configuration) :
		base(tokenRepository, logger)
	{
		_artifactRepository = artifactRepository;
		_logger = logger;
		_devopsAdapter = devopsAdapter;
		_updateHub = updateHub;

		var ignoredVersionsRaw = configuration.GetSection("IgnoredVersions").Get<string[]>() ?? Array.Empty<string>();
		_ignoredVersions = ignoredVersionsRaw.Select(str => new Regex(str)).ToList();
	}


	public async Task<Artifact> Add(ArtifactBase artifact)
	{
		var logger = _logger.Enter($"{Log.Format(artifact)}");

		var entity = await _artifactRepository.Add(artifact);
		var data = _artifactAssembler.Convert(entity);

		logger.Exit();

		await _updateHub.Clients.All.ArtifactUpdated(data);

		return data;
	}

	public async Task<List<Artifact>> GetAll(string organisation)
	{
		var logger = _logger.Enter($"{Log.Format(organisation)}");

		var entities = await _artifactRepository.GetAll(organisation);
		var artifacts = _artifactAssembler.Convert(entities);

		logger.Exit();
		return artifacts;
	}

	public async Task<Dictionary<Artifact, string>> GetAllWithNewVersion(string organisation)
	{
		var logger = _logger.Enter($"{Log.Format(organisation)}");
		var entities = await _artifactRepository.GetAll(organisation);

		var token = await RequiredToken(organisation);

		var newArtifacts = new ConcurrentDictionary<Artifact, string>();

		await Parallel.ForEachAsync(entities, async (entity, _) =>
		{
			var artifact = await _devopsAdapter.GetArtifact(new()
			{
				Name = entity.Name,
				Feed = entity.Feed,
				Organisation = entity.Organisation,
				LatestVersion = entity.LatestVersion,
				Protocol = entity.Protocol
			}, token.Pat);

			if (artifact == default)
			{
				logger.Error($"Impossible de récupérer la dernière version de l'artéfact {entity.Info}");
				return;
			}

			var latestVersion = artifact.Versions.First(version => version.IsLatest).Version;

			if (_ignoredVersions.All(regex => !regex.IsMatch(latestVersion)) && latestVersion != entity.LatestVersion) newArtifacts[_artifactAssembler.Convert(entity)] = latestVersion;
		});


		logger.Exit();

		return newArtifacts.ToDictionary(pair => pair.Key, pair => pair.Value);
	}

	public async Task Delete(string organisation, Guid id)
	{
		var logger = _logger.Enter($"{Log.Format(organisation)} {Log.Format(id)}");

		await _artifactRepository.Delete(id);

		await _updateHub.Clients.All.ArtifactDeleted(id);

		logger.Exit();
	}

	public async Task<List<ArtifactInfo>> Search(string organisation, string feed, string query)
	{
		var logger = _logger.Enter($"{Log.Format(organisation)} {Log.Format(query)} {Log.Format(feed)}");

		var token = await RequiredToken(organisation);

		var artifacts = await _devopsAdapter.SearchArtifacts(query, feed, token);

		logger.Exit();

		return artifacts.Select(artifact => new ArtifactInfo
		{
			Name = artifact.Name,
			Organisation = token.Organisation,
			Feed = feed,
			LatestVersion = artifact.Versions.First().Version,
			Protocol = Enum.Parse<ArtifactProtocol>(artifact.ProtocolType)
		}).ToList();
	}

	public async Task<List<AzureFeed>> GetFeeds(string organisation)
	{
		var logger = _logger.Enter($"{Log.Format(organisation)}");

		var token = await RequiredToken(organisation);

		var feeds = await _devopsAdapter.GetArtifactFeeds(token);

		logger.Exit();

		return feeds.Select(artifact => new AzureFeed
		{
			Id = artifact.Id,
			Name = artifact.Name
		}).ToList();
	}

	public async Task Update(Guid id, ArtifactBase artifact)
	{
		var logger = _logger.Enter($"{Log.Format(id)}");

		var updated = await _artifactRepository.Update(id, artifact);

		await _updateHub.Clients.All.ArtifactUpdated(_artifactAssembler.Convert(updated));

		logger.Exit();
	}
}