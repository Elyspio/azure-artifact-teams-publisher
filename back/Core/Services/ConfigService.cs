using AzureArtifact.Api.Abstractions.Common.Extensions;
using AzureArtifact.Api.Abstractions.Interfaces.Hubs;
using AzureArtifact.Api.Abstractions.Interfaces.Repositories;
using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Abstractions.Transports.Token;
using AzureArtifact.Api.Core.Assemblers;
using AzureArtifact.Api.Core.Services.Internal;
using AzureArtifact.Api.Sockets.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace AzureArtifact.Api.Core.Services;

public class ConfigService : BaseService, IConfigService
{
	private readonly ILogger<ConfigService> _logger;
	private readonly TokenAssembler _tokenAssembler = new();
	private readonly IConfigRepository _configRepository;
	private readonly IHubContext<UpdateHub, IUpdateHub> _updateHub;

	public ConfigService(IConfigRepository configRepository, ILogger<ConfigService> logger, IHubContext<UpdateHub, IUpdateHub> updateHub) : base(configRepository, logger)
	{
		_configRepository = configRepository;
		_logger = logger;
		_updateHub = updateHub;
	}

	public async new Task<Config?> GetToken(string organisation)
	{
		var logger = _logger.Enter();

		var token = await base.GetToken(organisation);

		logger.Exit();
		return token;
	}

	public async Task SetToken(ConfigBase config)
	{
		var logger = _logger.Enter($"{Log.Format(config.Organisation)} {Log.Format(config.Expiration)}");

		var entity = await _configRepository.SetToken(config);

		await _updateHub.Clients.All.ConfigUpdated(_tokenAssembler.Convert(entity));

		logger.Exit();
	}
}