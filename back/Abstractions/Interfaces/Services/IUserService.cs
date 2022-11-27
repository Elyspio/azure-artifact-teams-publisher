using AzureArtifact.Api.Abstractions.Transports.User;

namespace AzureArtifact.Api.Abstractions.Interfaces.Services;

public interface IUserService
{
	/// <summary>
	///     Recherche les utilisateurs respectant le critère de recherche dans Azure DevOps
	/// </summary>
	/// <returns></returns>
	Task<List<UserData>> SearchUsers(string nameOrMail);
}