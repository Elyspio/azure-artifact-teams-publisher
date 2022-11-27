namespace AzureArtifact.Api.Adapters.Types.Responses;

public class AzureGetRepositoryResponse
{
	public List<AzureRepository> Value { get; set; }
	public long Count { get; set; }
}

public class AzureRepository
{
	public Guid Id { get; set; }
	public string Name { get; set; }
	public Uri Url { get; set; }
	public string DefaultBranch { get; set; }
	public long Size { get; set; }
	public Uri RemoteUrl { get; set; }
	public string SshUrl { get; set; }
	public Uri WebUrl { get; set; }
	public bool IsDisabled { get; set; }
}

