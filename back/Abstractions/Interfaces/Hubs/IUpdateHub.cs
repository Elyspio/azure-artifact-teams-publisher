using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Abstractions.Transports.Project;
using AzureArtifact.Api.Abstractions.Transports.Token;

namespace AzureArtifact.Api.Abstractions.Interfaces.Hubs;

public interface IUpdateHub
{
	Task ArtifactUpdated(Artifact artifact);
	Task ArtifactDeleted(Guid idArtifact);
	Task ProjectUpdated(Project project);
	Task ConfigUpdated(Config config);
}