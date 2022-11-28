namespace AzureArtifact.Api.Abstractions.Transports.Project;

public class Project
{
	public required string Organisation { get; init; }
	public Guid IdAzure { get; init; }
	public required string Name { get; init; }
	public required List<Repository> Repositories { get; init; }
}