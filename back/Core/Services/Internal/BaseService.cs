using AzureArtifact.Api.Abstractions.Common.Extensions;
using AzureArtifact.Api.Abstractions.Interfaces.Repositories;
using AzureArtifact.Api.Abstractions.Transports.Token;
using AzureArtifact.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;
using System.Security.Authentication;

namespace AzureArtifact.Api.Core.Services.Internal;

public class BaseService
{
	private readonly ILogger<BaseService> _logger;
	private readonly TokenAssembler _tokenAssembler = new();
	private readonly IConfigRepository _configRepository;


	protected BaseService(IConfigRepository configRepository, ILogger<BaseService> logger)
	{
		_configRepository = configRepository;
		_logger = logger;
	}

	async protected Task<Config?> GetToken(string organisation)
	{
		var logger = _logger.Enter();

		var token = await _configRepository.GetToken(organisation);

		logger.Exit();

		return token is null ? null : _tokenAssembler.Convert(token);
	}

	async protected Task<Config> RequiredToken(string organisation)
	{
		var logger = _logger.Enter();
		var token = await GetToken(organisation);

		if (token is null)
		{
			logger.Error("Aucun config n'est inscrit en base de données");
			throw new AuthenticationException("Aucun config n'est inscrit en base de données");
		}

		logger.Exit();

		return token;
	}
}