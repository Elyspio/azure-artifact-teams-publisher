using AzureArtifact.Api.Abstractions.Transports.Artifacts;

namespace AzureArtifact.Api.Abstractions.Interfaces.Services;

public interface IArtifactService
{
	Task<Artifact> Add(ArtifactBase artifact);
	Task<List<Artifact>> GetAll(string organisation);
	Task<Dictionary<ArtifactInfo, string>> GetAllWithNewVersion(string organisation);
	Task Delete(string organisation, Guid id);
	Task<List<ArtifactInfo>> Search(string organisation, string feed, string query);
	Task<List<AzureFeed>> GetFeeds(string organisation);
	Task Update(string organization, Guid id, ArtifactBase artifact);
}