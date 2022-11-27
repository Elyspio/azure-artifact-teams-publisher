using Microsoft.Extensions.Logging;

namespace AzureArtifact.Api.Adapters.Adapters;

public class TeamsAdapter
{
	private ILogger<TeamsAdapter> _logger;

	public TeamsAdapter(ILogger<TeamsAdapter> logger)
	{
		_logger = logger;
	}
}