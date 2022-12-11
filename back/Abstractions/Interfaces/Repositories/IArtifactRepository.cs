using AzureArtifact.Api.Abstractions.Models;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;

namespace AzureArtifact.Api.Abstractions.Interfaces.Repositories;

public interface IArtifactRepository
{
	Task<ArtifactEntity> Add(ArtifactBase info);
	Task<List<ArtifactEntity>> GetAll(string organisation);
	Task Delete(Guid id);
}