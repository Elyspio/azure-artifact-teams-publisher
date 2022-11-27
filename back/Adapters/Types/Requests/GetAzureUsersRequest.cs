namespace AzureArtifact.Api.Adapters.Types.Requests;

public class GetAzureUsersRequest
{
	public string Query { get; set; }
	public List<string> IdentityTypes { get; set; }
	public List<string> OperationScopes { get; set; }
	public Options Options { get; set; }
	public List<string> Properties { get; set; }
}

public class Options
{
	public long MinResults { get; set; }
	public long MaxResults { get; set; }
}