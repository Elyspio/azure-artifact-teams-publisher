using AzureArtifact.Api.Abstractions.Transports.Enums;

namespace AzureArtifact.Api.Abstractions.Transports.Token;

public class TokenBase
{
	/// <summary>
	///     Access token d'un utilisateur azure ayant la permission de voir les repos et les feeds d'artéfact
	/// </summary>
	public required string Pat { get; init; }

	public TokenExpiration Expiration { get; set; }
	
	public string Organisation { get; set; }
}