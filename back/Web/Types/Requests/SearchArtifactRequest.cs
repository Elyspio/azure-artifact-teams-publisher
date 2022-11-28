namespace AzureArtifact.Api.Web.Types.Requests;

public record SearchArtifactRequest(string Query, Guid Feed);