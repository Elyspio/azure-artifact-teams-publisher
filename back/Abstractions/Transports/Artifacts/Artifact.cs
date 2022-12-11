using System.ComponentModel.DataAnnotations;

namespace AzureArtifact.Api.Abstractions.Transports.Artifacts;

public class Artifact : ArtifactBase
{
	[Required] public required Guid Id { get; set; }
}