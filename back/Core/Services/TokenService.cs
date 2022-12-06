using AzureArtifact.Api.Abstractions.Common.Extensions;
using AzureArtifact.Api.Abstractions.Interfaces.Repositories;
using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Abstractions.Transports.Enums;
using AzureArtifact.Api.Abstractions.Transports.Token;
using AzureArtifact.Api.Core.Assemblers;
using AzureArtifact.Api.Core.Services.Internal;
using Microsoft.Extensions.Logging;

namespace AzureArtifact.Api.Core.Services;

public class TokenService : BaseService, ITokenService
{
	private readonly ILogger<TokenService> _logger;
	private readonly TokenAssembler _tokenAssembler = new();
	private readonly ITokenRepository _tokenRepository;

	public TokenService(ITokenRepository tokenRepository, ILogger<TokenService> logger) : base(tokenRepository, logger)
	{
		_tokenRepository = tokenRepository;
		_logger = logger;
	}

	public async new Task<Token?> GetToken(string organisation)
	{
		var logger = _logger.Enter();

		var token = await base.GetToken(organisation);

		logger.Exit();
		return token;
	}

	public async Task SetToken(string organisation, string pat, TokenExpiration expiration)
	{
		var logger = _logger.Enter(Log.Format(expiration));

		await _tokenRepository.SetToken(organisation, pat, expiration);

		logger.Exit();
	}
}