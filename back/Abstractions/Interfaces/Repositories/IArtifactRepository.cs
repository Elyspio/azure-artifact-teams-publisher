using AzureArtifact.Api.Abstractions.Models;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;

namespace AzureArtifact.Api.Abstractions.Interfaces.Repositories;

public interface IArtifactRepository
{
	Task<ArtifactEntity> Add(ArtifactInfo info, string version);
	Task<List<ArtifactEntity>> GetAll(string organisation);
	Task Delete(Guid id);
}