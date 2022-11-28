namespace AzureArtifact.Api.Abstractions.Transports.Artifacts;

/// <summary>
/// </summary>
/// <param name="ImpactedRepositories"></param>
public record PublishInfo(List<(string project, string repository)> ImpactedRepositories);