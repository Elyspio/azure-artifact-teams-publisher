using AzureArtifact.Api.Abstractions.Models;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Abstractions.Transports.Project;
using AzureArtifact.Api.Abstractions.Transports.User;

namespace AzureArtifact.Api.Abstractions.Interfaces.Repositories;

public interface IProjectRepository
{
	Task UpdateProject(string organisation, Project project);

	Task<ProjectEntity> UpdateRepositoryMaintainers(Guid repositoryId, List<UserData> maintainers);
	Task<List<ProjectEntity>> GetAll(string organisation);
	Task<Dictionary<ArtifactRepositoryId, List<UserData>>> GetMaintainers(List<ArtifactRepositoryId> notifies);
}