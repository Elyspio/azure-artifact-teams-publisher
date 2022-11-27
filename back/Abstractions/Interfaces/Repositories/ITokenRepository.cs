using AzureArtifact.Api.Abstractions.Models;
using AzureArtifact.Api.Abstractions.Transports.Enums;

namespace AzureArtifact.Api.Abstractions.Interfaces.Repositories;

public interface ITokenRepository
{
	Task<TokenEntity?> GetToken();
	Task<TokenEntity> SetToken(string pat, TokenExpiration expiration);
}