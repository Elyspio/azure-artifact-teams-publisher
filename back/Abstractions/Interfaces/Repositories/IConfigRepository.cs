using AzureArtifact.Api.Abstractions.Models;
using AzureArtifact.Api.Abstractions.Transports.Token;

namespace AzureArtifact.Api.Abstractions.Interfaces.Repositories;

public interface IConfigRepository
{
	Task<ConfigEntity?> GetToken(string organisation);
	Task<ConfigEntity> SetToken(ConfigBase config);
}