using AzureArtifact.Api.Abstractions.Models;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;

namespace AzureArtifact.Api.Abstractions.Interfaces.Repositories;

public interface IArtifactRepository
{
	Task<ArtifactEntity> Add(ArtifactInfo info, Version version);
	Task<List<ArtifactEntity>> GetAll();
	Task Delete(Guid id);
}