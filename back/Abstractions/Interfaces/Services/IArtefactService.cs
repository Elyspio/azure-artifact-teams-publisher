using AzureArtifact.Api.Abstractions.Transports.Artifacts;

namespace AzureArtifact.Api.Abstractions.Interfaces.Services;

public interface IArtefactService
{
	Task<Artifact> Add(ArtifactInfo info, Version version);
	Task<List<Artifact>> GetAll();
	Task<Dictionary<ArtifactInfo, Version>> GetAllWithNewVersion();
	Task Delete(Guid id);
}