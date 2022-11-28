namespace AzureArtifact.Api.Abstractions.Transports.Artifacts;

public class ArtifactInfo
{
	public required string Name { get; set; }
	public required string FeedId { get; set; }
	public required string Organisation { get; set; }

	public override string ToString()
	{
		return $"{Organisation} {FeedId} {Name}";
	}
}