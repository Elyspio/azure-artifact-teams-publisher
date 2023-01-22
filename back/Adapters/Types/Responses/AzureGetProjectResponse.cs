namespace AzureArtifact.Api.Adapters.Types.Responses;

public class AzureGetProjectsResponse
{
	public enum State
	{
		WellFormed
	}

	public enum Visibility
	{
		Private
	}

	public long Count { get; set; }
	public required List<AzureProject> Value { get; set; }

	public class AzureProject
	{
		public Guid Id { get; set; }
		public required string Name { get; set; }
		public required string Description { get; set; }
		public required Uri Url { get; set; }
		public State State { get; set; }
		public long Revision { get; set; }
		public Visibility Visibility { get; set; }
		public DateTimeOffset LastUpdateTime { get; set; }
	}
}