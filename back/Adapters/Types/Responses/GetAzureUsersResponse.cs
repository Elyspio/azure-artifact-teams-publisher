namespace AzureArtifact.Api.Adapters.Types.Responses;

public class GetAzureUsersResponse
{
	public required List<Result> Results { get; set; }
}

public class Result
{
	public required string QueryToken { get; set; }
	public required List<Identity> Identities { get; set; }
	public required string PagingToken { get; set; }
}

public class Identity
{
	public required string EntityId { get; set; }
	public EntityType EntityType { get; set; }
	public Directory OriginDirectory { get; set; }
	public Guid OriginId { get; set; }
	public Directory LocalDirectory { get; set; }
	public Guid LocalId { get; set; }
	public required string DisplayName { get; set; }
	public required string Mail { get; set; }
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