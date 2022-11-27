using AzureArtifact.Api.Abstractions.Transports.Project;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AzureArtifact.Api.Abstractions.Models;

public class ProjectEntity : Project
{
	[BsonId]
	public ObjectId Id { get; set; }
}