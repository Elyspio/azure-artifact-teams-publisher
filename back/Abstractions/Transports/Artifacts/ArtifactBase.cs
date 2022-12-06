namespace AzureArtifact.Api.Abstractions.Transports.Artifacts;

public class ArtifactBase : ArtifactInfo
{
	public required string LatestVersion { get; set; }
}