using AzureArtifact.Api.Abstractions.Transports.Enums;

namespace AzureArtifact.Api.Web.Types.Requests;

public record SetTokenRequest(string Pat, TokenExpiration Expiration, string Webhook);