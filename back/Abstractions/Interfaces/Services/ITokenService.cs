using AzureArtifact.Api.Abstractions.Transports.Enums;
using AzureArtifact.Api.Abstractions.Transports.Token;

namespace AzureArtifact.Api.Abstractions.Interfaces.Services;

public interface ITokenService
{
	/// <summary>
	///     Récupère le PAT pour faire les requête en direction d'Azure DevOps
	/// </summary>
	/// <param name="organisation"></param>
	/// <returns></returns>
	Task<Token?> GetToken(string organisation);

	/// <summary>
	///     Remplace le PAT utilisé pour faire les requêtes en direction d'Azure DevOps
	/// </summary>
	/// <param name="organisation"></param>
	/// <param name="pat"></param>
	/// <param name="expiration"></param>
	/// <returns></returns>
	Task SetToken(string organisation, string pat, TokenExpiration expiration);
}