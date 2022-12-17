namespace AzureArtifact.Api.Abstractions.Transports.Artifacts;

public class ArtifactRepositoryId
{
	/// <summary>
	///     Project's name
	/// </summary>
	public required string Project { get; set; }

	/// <summary>
	///     Repository's name
	/// </summary>
	public required string Repository { get; set; }
}