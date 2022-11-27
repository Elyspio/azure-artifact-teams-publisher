namespace AzureArtifact.Api.Adapters.Types.Responses;

public class GetAzureUsersResponse
{
	public List<Result> Results { get; set; }
}

public class Result
{
	public string QueryToken { get; set; }
	public List<Identity> Identities { get; set; }
	public string PagingToken { get; set; }
}

public class Identity
{
	public string EntityId { get; set; }
	public EntityType EntityType { get; set; }
	public Directory OriginDirectory { get; set; }
	public Guid OriginId { get; set; }
	public Directory LocalDirectory { get; set; }
	public Guid LocalId { get; set; }
	public string DisplayName { get; set; }
	public string Mail { get; set; }
}

public enum EntityType
{
	User
}

public enum Directory
{
	Aad,
	Vsd
}