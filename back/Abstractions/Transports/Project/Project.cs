namespace AzureArtifact.Api.Abstractions.Transports.Project;

public class Project
{
	public Guid IdAzure { get; init; }
	public required string Name { get; init; }
	public required List<Repository> Repositories { get; init; }
}