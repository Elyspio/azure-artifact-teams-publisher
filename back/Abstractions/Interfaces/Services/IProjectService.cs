using AzureArtifact.Api.Abstractions.Transports.Project;
using AzureArtifact.Api.Abstractions.Transports.User;

namespace AzureArtifact.Api.Abstractions.Interfaces.Services;

public interface IProjectService
{
	/// <summary>
	///     Recherche les utilisateurs respectant le critère de recherche dans Azure DevOps
	/// </summary>
	/// <param name="organisation"></param>
	/// <returns></returns>
	Task<List<Project>> GetAll(string organisation);

	/// <summary>
	///     Ajout en base de données les nouveaux projets / repo
	/// </summary>
	/// <param name="organisation"></param>
	/// <returns></returns>
	Task RefreshAll(string organisation);


	/// <summary>
	///     Update les mainteneurs d'un repo
	/// </summary>
	/// <param name="organisation"></param>
	/// <param name="repositoryId"></param>
	/// <param name="maintainers"></param>
	/// <returns></returns>
	Task UpdateRepositoryMaintainers(string organisation, Guid repositoryId, List<UserData> maintainers);
}