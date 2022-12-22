using AzureArtifact.Api.Abstractions.Interfaces.Repositories;
using AzureArtifact.Api.Abstractions.Models;
using AzureArtifact.Api.Abstractions.Transports.Enums;
using AzureArtifact.Api.Db.Repositories.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace AzureArtifact.Api.Db.Repositories;

internal class TokenRepository : BaseRepository<TokenEntity>, ITokenRepository
{
	public TokenRepository(IConfiguration configuration, ILogger<BaseRepository<TokenEntity>> logger) : base(configuration, logger)
	{
	}

	public async Task<TokenEntity?> GetToken(string organisation)
	{
		return await EntityCollection.AsQueryable().FirstOrDefaultAsync(token => token.Organisation == organisation);
	}

	public async Task<TokenEntity> SetToken(string organisation, string webhook, string pat, TokenExpiration expiration)
	{
		await EntityCollection.DeleteManyAsync(entity => true);
		var entity = new TokenEntity
		{
			Pat = pat,
			Expiration = expiration,
			Organisation = organisation,
			Webhook = webhook
		};

		await EntityCollection.InsertOneAsync(entity);

		return entity;
	}
}