using AzureArtifact.Api.Abstractions.Transports.Token;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AzureArtifact.Api.Abstractions.Models;

public class TokenEntity : TokenBase
{
	[BsonId]
	public ObjectId Id { get; init; }
}