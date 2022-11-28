namespace AzureArtifact.Api.Abstractions.Transports.Artifacts;

public class ArtifactBase : ArtifactInfo
{
	public required Version LatestVersion { get; set; }
}