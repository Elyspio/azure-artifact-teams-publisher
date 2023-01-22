using AzureArtifact.Api.Abstractions.Transports.Token;

namespace AzureArtifact.Api.Abstractions.Interfaces.Services;

public interface IConfigService
{
	/// <summary>
	///     Récupère le PAT pour faire les requête en direction d'Azure DevOps
	/// </summary>
	/// <param name="organisation"></param>
	/// <returns></returns>
	Task<Config?> GetToken(string organisation);

	/// <summary>
	///     Remplace le PAT utilisé pour faire les requêtes en direction d'Azure DevOps
	/// </summary>
	/// <returns></returns>
	Task SetToken(ConfigBase config);
}