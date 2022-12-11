using System.ComponentModel.DataAnnotations;

namespace AzureArtifact.Api.Abstractions.Transports.Artifacts;

public class ArtifactBase : ArtifactInfo
{
	[Required] public required List<ArtifactRepository> Notifies { get; set; }
}