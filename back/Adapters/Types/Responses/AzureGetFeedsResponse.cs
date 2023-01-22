namespace AzureArtifact.Api.Adapters.Types.Responses;

public class AzureGetFeedsResponse
{
	public long Count { get; set; }
	public List<AzureFeed> Value { get; set; }

	public class AzureFeed
	{
		public string? Description { get; set; }
		public required Uri Url { get; set; }
		public required LinksV Links { get; set; }
		public bool? HideDeletedPackageVersions { get; set; }
		public Guid DefaultViewId { get; set; }
		public Guid Id { get; set; }
		public required string Name { get; set; }
		public bool UpstreamEnabled { get; set; }
		public string FullyQualifiedName { get; set; }
		public Guid FullyQualifiedId { get; set; }
		public List<UpstreamSource> UpstreamSources { get; set; }
		public string Capabilities { get; set; }
		public bool? BadgesEnabled { get; set; }

		public class LinksV
		{
			public required Packages Self { get; set; }
			public required Packages Packages { get; set; }
			public required Packages Permissions { get; set; }
		}


		public class Packages
		{
			public required Uri Href { get; set; }
		}

		public class UpstreamSource
		{
			public Guid Id { get; set; }
			public required string Name { get; set; }
			public required string Protocol { get; set; }
			public required Uri Location { get; set; }
			public required Uri DisplayLocation { get; set; }
			public required string UpstreamSourceType { get; set; }
			public required string Status { get; set; }
		}
	}
}