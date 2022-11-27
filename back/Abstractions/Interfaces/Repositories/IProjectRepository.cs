using AzureArtifact.Api.Abstractions.Transports.Project;
using AzureArtifact.Api.Abstractions.Transports.User;

namespace AzureArtifact.Api.Abstractions.Interfaces.Repositories;

public interface IProjectRepository
{
	Task UpdateProject(Project project);

	Task UpdateRepositoryMaintainers(Guid repositoryId, List<UserData> maintainers);
}