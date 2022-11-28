using System.Text.Json.Serialization;

namespace AzureArtifact.Api.Adapters.Types.Responses;

public class AzureArtifacts
{
	public long Count { get; set; }
	public List<RawArtifact> Value { get; set; } = new();
}

public class RawArtifact
{
	public Guid Id { get; set; }
	public string NormalizedName { get; set; } = default!;
	public string Name { get; set; } = default!;
	public string ProtocolType { get; set; } = default!;
	public Uri Url { get; set; } = default!;
	public List<ArtifactVersion> Versions { get; set; } = default!;
	public Links Links { get; set; } = default!;
}

public class Links
{
	public Feed Self { get; set; } = default!;
	public Feed Feed { get; set; } = default!;
	public Feed Versions { get; set; } = default!;
}

public class Feed
{
	public Uri Href { get; set; } = default!;
}

public class ArtifactVersion
{
	public Guid Id { get; set; }
	public string NormalizedVersion { get; set; } = default!;
	public Version Version { get; set; } = default!;
	public bool IsLatest { get; set; }
	public bool IsListed { get; set; }
	public string StorageId { get; set; } = default!;
	public List<View> Views { get; set; }
	public DateTimeOffset PublishDate { get; set; } = default!;
}

public class View
{
	public Guid Id { get; set; }
	public string Name { get; set; } = default!;
	public object Url { get; set; } = default!;
	public string Type { get; set; } = default!;
}