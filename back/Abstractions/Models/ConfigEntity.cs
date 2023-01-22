using AzureArtifact.Api.Abstractions.Transports.Token;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AzureArtifact.Api.Abstractions.Models;

public class ConfigEntity : ConfigBase
{
	[BsonId]
	public ObjectId Id { get; init; }
}