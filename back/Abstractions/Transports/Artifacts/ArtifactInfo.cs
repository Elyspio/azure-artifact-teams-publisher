namespace AzureArtifact.Api.Abstractions.Transports.Artifacts;

public class ArtifactInfo
{
	public required string Name { get; set; }
	public required string Feed { get; set; }
	public required string Organisation { get; set; }
	public required string LatestVersion { get; set; }

	/**
	 * Repositories to notify on update
	 */
	public override string ToString()
	{
		return $"{Organisation} {Feed} {Name}";
	}
}