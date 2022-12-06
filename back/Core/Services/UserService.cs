using AzureArtifact.Api.Abstractions.Common.Extensions;
using AzureArtifact.Api.Abstractions.Interfaces.Repositories;
using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Abstractions.Transports.User;
using AzureArtifact.Api.Adapters.Adapters;
using AzureArtifact.Api.Core.Assemblers;
using Microsoft.Extensions.Logging;
using System.Security.Authentication;

namespace AzureArtifact.Api.Core.Services;

public class UserService : IUserService
{
	private readonly AzureDevopsAdapter _devopsAdapter;
	private readonly ILogger<UserService> _logger;
	private readonly ITokenRepository _tokenRepository;
	private readonly UserAssembler _userAssembler = new();

	public UserService(AzureDevopsAdapter devopsAdapter, ILogger<UserService> logger, ITokenRepository tokenRepository)
	{
		_devopsAdapter = devopsAdapter;
		_logger = logger;
		_tokenRepository = tokenRepository;
	}

	public async Task<List<UserData>> SearchUsers(string organisation, string nameOrMail)
	{
		var logger = _logger.Enter(Log.Format(nameOrMail));

		var pat = (await _tokenRepository.GetToken(organisation))?.Pat;

		if (pat is null)
		{
			logger.Error("Aucun token n'est inscrit en base de données");
			throw new AuthenticationException("Aucun token n'est inscrit en base de données");
		}

		var rawUser = await _devopsAdapter.GetIdentities(nameOrMail, pat);
		var users = _userAssembler.Convert(rawUser);
		logger.Exit();

		return users;
	}
}