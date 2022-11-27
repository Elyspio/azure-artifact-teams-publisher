using AzureArtifact.Api.Abstractions.Common.Extensions;
using AzureArtifact.Api.Abstractions.Interfaces.Repositories;
using AzureArtifact.Api.Abstractions.Models;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Db.Repositories.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace AzureArtifact.Api.Db.Repositories;

internal class ArtifactRepository : BaseRepository<ArtifactEntity>, IArtifactRepository
{
	public ArtifactRepository(IConfiguration configuration, ILogger<BaseRepository<ArtifactEntity>> logger) : base(configuration, logger)
	{
	}


	public async Task<ArtifactEntity> Add(ArtifactInfo info, Version version)
	{
		var entity = new ArtifactEntity
		{
			FeedId = info.FeedId,
			Organisation = info.Organisation,
			Name = info.Name,
			LatestVersion = version
		};

		await EntityCollection.InsertOneAsync(entity);

		return entity;
	}

	public async Task<List<ArtifactEntity>> GetAll()
	{
		return await EntityCollection.AsQueryable().ToListAsync();
	}


	public async Task Delete(Guid id)
	{
		await EntityCollection.DeleteOneAsync(artifact => artifact.Id == id.AsObjectId());
	}
}