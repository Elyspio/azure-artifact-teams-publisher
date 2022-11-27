using AzureArtifact.Api.Abstractions.Transports.Artifacts;

namespace AzureArtifact.Api.Web.Types.Requests;

/// <summary>
/// </summary>
/// <param name="Info">Identifiant de l'artéfact</param>
/// <param name="Version">dernière version connu de l'artéfact</param>
public record AddArtifactRequest(ArtifactInfo Info, Version Version);