using AzureArtifact.Api.Abstractions.Transports.User;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AzureArtifact.Api.Abstractions.Transports.Project;

[BsonNoId]
public class Repository
{
	[BsonRepresentation(BsonType.String)]
	public required Guid Id { get; init; }

	public required string Name { get; init; }
	public List<UserData> Maintainers { get; set; } = new();
}