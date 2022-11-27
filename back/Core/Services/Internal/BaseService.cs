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
	private readonly ITokenRepository _tokenRepository;


	protected BaseService(ITokenRepository tokenRepository, ILogger<BaseService> logger)
	{
		_tokenRepository = tokenRepository;
		_logger = logger;
	}

	async protected Task<Token?> GetToken()
	{
		var logger = _logger.Enter();

		var token = await _tokenRepository.GetToken();

		logger.Exit();

		return token is null ? null : _tokenAssembler.Convert(token);
	}

	async protected Task<Token> RequiredToken()
	{
		var logger = _logger.Enter();
		var token = await GetToken();

		if (token is null)
		{
			logger.Error("Aucun token n'est inscrit en base de données");
			throw new AuthenticationException("Aucun token n'est inscrit en base de données");
		}

		logger.Exit();

		return token;
	}
}