namespace AzureArtifact.Api.Abstractions.Transports.Artifacts;

public class AzureFeed
{
	public required Guid Id { get; set; }
	public required string Name { get; set; }
}