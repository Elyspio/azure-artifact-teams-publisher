using AzureArtifact.Api.Abstractions.Models;
using AzureArtifact.Api.Abstractions.Transports.Enums;

namespace AzureArtifact.Api.Abstractions.Interfaces.Repositories;

public interface ITokenRepository
{
	Task<TokenEntity?> GetToken(string organisation);
	Task<TokenEntity> SetToken(string organisation, string pat, TokenExpiration expiration);
}