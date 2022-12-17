namespace AzureArtifact.Api.Abstractions.Interfaces.Services;

public interface IManagementService
{
	Task WatchChanged();
}