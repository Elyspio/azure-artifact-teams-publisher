using AzureArtifact.Api.Abstractions.Transports.Artifacts;

namespace AzureArtifact.Api.Web.Types.Requests;

/// <summary>
/// </summary>
/// <param name="artifact">Identifiant ou nom de l'artéfact</param>
/// <param name="Version">dernière version connu de l'artéfact</param>
public record AddArtifactRequest(string artifact, Version Version);