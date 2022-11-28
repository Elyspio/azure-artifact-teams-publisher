using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Adapters.Types.Responses;

namespace AzureArtifact.Api.Abstractions.Interfaces.Services;

public interface IArtefactService
{
	Task<Artifact> Add(string organisation, ArtifactInfo info, Version version);
	Task<List<Artifact>> GetAll(string organisation);
	Task<Dictionary<ArtifactInfo, Version>> GetAllWithNewVersion(string organisation);
	Task Delete(string organisation, Guid id);
	Task<List<ArtifactInfo>> Search(string organisation, string feed, string query);
	Task<List<AzureFeed>> GetFeeds(string organisation);
}