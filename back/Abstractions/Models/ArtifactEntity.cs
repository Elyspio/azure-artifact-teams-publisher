using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AzureArtifact.Api.Abstractions.Models;

public class ArtifactEntity : ArtifactBase
{
	[BsonId]
	[BsonRepresentation(BsonType.ObjectId)]
	public ObjectId Id { get; init; }

	public string Info => $"{Organisation} {FeedId} {Name}";
}