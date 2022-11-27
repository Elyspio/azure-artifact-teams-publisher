using MongoDB.Bson.Serialization.Attributes;

namespace AzureArtifact.Api.Abstractions.Transports.User;

[BsonNoId]
public class UserData
{
	public required string Mail { get; set; }
	public required string Id { get; set; }

	public required string Name { get; set; }
}