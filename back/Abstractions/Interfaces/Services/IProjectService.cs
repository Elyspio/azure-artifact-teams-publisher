using AzureArtifact.Api.Abstractions.Transports.Project;
using AzureArtifact.Api.Abstractions.Transports.User;

namespace AzureArtifact.Api.Abstractions.Interfaces.Services;

public interface IProjectService
{
	/// <summary>
	///     Recherche les utilisateurs respectant le critère de recherche dans Azure DevOps
	/// </summary>
	/// <returns></returns>
	Task<List<Project>> GetAll();

	/// <summary>
	///     Ajout en base de données les nouveaux projets / repo
	/// </summary>
	/// <returns></returns>
	Task RefreshAll();


	/// <summary>
	///     Update les mainteneurs d'un repo
	/// </summary>
	/// <param name="repositoryId"></param>
	/// <param name="maintainers"></param>
	/// <returns></returns>
	Task UpdateRepositoryMaintainers(Guid repositoryId, List<UserData> maintainers);
}