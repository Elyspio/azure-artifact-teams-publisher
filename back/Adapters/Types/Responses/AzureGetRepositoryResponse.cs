namespace AzureArtifact.Api.Adapters.Types.Responses;

public class AzureGetRepositoryResponse
{
	public required List<AzureRepository> Value { get; set; }
	public long Count { get; set; }
}

public class AzureRepository
{
	public Guid Id { get; set; }
	public required string Name { get; set; }
	public required Uri Url { get; set; }
	public required string DefaultBranch { get; set; }
	public long Size { get; set; }
	public required Uri RemoteUrl { get; set; }
	public required string SshUrl { get; set; }
	public required Uri WebUrl { get; set; }
	public bool IsDisabled { get; set; }
}