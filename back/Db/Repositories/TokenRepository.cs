using AzureArtifact.Api.Abstractions.Interfaces.Repositories;
using AzureArtifact.Api.Abstractions.Models;
using AzureArtifact.Api.Abstractions.Transports.Enums;
using AzureArtifact.Api.Db.Repositories.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace AzureArtifact.Api.Db.Repositories;

internal class TokenRepository : BaseRepository<TokenEntity>, ITokenRepository
{
	public TokenRepository(IConfiguration configuration, ILogger<BaseRepository<TokenEntity>> logger) : base(configuration, logger)
	{
	}

	public async Task<TokenEntity?> GetToken()
	{
		return await EntityCollection.AsQueryable().FirstOrDefaultAsync();
	}

	public async Task<TokenEntity> SetToken(string pat, TokenExpiration expiration)
	{
		await EntityCollection.DeleteManyAsync(entity => true);
		var entity = new TokenEntity
		{
			Pat = pat,
			Expiration = expiration
		};

		await EntityCollection.InsertOneAsync(entity);

		return entity;
	}
}