namespace AzureArtifact.Api.Abstractions.Transports.Token;

public class Token : TokenBase
{
	public Guid Id { get; init; }
	public DateTime ExpireAt { get; set; }
	public string Organisation { get; set; }
}