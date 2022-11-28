namespace AzureArtifact.Api.Adapters.Types.Requests;

public class GetAzureUsersRequest
{
	public required string Query { get; set; }
	public required List<string> IdentityTypes { get; set; }
	public required List<string> OperationScopes { get; set; }
	public required Options Options { get; set; }
	public required List<string> Properties { get; set; }
}

public class Options
{
	public long MinResults { get; set; }
	public long MaxResults { get; set; }
}