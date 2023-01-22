namespace AzureArtifact.Api.Abstractions.Transports.Token;

public class Config : ConfigBase
{
	public Guid Id { get; init; }
	public DateTime ExpireAt { get; set; }
}