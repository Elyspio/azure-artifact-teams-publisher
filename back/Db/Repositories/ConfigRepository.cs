using AzureArtifact.Api.Abstractions.Interfaces.Repositories;
using AzureArtifact.Api.Abstractions.Models;
using AzureArtifact.Api.Abstractions.Transports.Token;
using AzureArtifact.Api.Db.Repositories.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace AzureArtifact.Api.Db.Repositories;

internal class ConfigRepository : BaseRepository<ConfigEntity>, IConfigRepository
{
	public ConfigRepository(IConfiguration configuration, ILogger<BaseRepository<ConfigEntity>> logger) : base(configuration, logger)
	{
	}

	public async Task<ConfigEntity?> GetToken(string organisation)
	{
		return await EntityCollection.AsQueryable().FirstOrDefaultAsync(token => token.Organisation == organisation);
	}

	public async Task<ConfigEntity> SetToken(ConfigBase config)
	{
		await EntityCollection.DeleteManyAsync(entity => true);
		var entity = new ConfigEntity
		{
			Pat = config.Pat,
			Expiration = config.Expiration,
			Organisation = config.Organisation,
			Webhook = config.Webhook,
			IgnoredPattern = config.IgnoredPattern
		};

		await EntityCollection.InsertOneAsync(entity);

		return entity;
	}
}