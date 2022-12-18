using AzureArtifact.Api.Abstractions.Common.Extensions;
using AzureArtifact.Api.Abstractions.Interfaces.Repositories;
using AzureArtifact.Api.Abstractions.Models;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Db.Repositories.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System.Security;

namespace AzureArtifact.Api.Db.Repositories;

internal class ArtifactRepository : BaseRepository<ArtifactEntity>, IArtifactRepository
{
	public ArtifactRepository(IConfiguration configuration, ILogger<BaseRepository<ArtifactEntity>> logger) : base(configuration, logger)
	{
	}


	public async Task<ArtifactEntity> Add(ArtifactBase info)
	{
		var entity = new ArtifactEntity
		{
			Feed = info.Feed,
			Organisation = info.Organisation,
			Name = info.Name,
			LatestVersion = info.LatestVersion,
			Notifies = info.Notifies,
			Protocol = info.Protocol
		};

		await EntityCollection.InsertOneAsync(entity);

		return entity;
	}

	public async Task<List<ArtifactEntity>> GetAll(string organisation)
	{
		return await EntityCollection.AsQueryable().Where(artifact => artifact.Organisation == organisation).ToListAsync();
	}

	public async Task Delete(Guid id)
	{
		var result = await EntityCollection.DeleteOneAsync(artifact => artifact.Id == id.AsObjectId());
		if (result.DeletedCount == 0) throw new VerificationException("None artifact was removed");
	}

	public async Task<ArtifactEntity> Update(Guid id, ArtifactBase artifact)
	{
		var entity = new ArtifactEntity
		{
			Id = id.AsObjectId(),
			Name = artifact.Name,
			Feed = artifact.Feed,
			Organisation = artifact.Organisation,
			LatestVersion = artifact.LatestVersion,
			Protocol = artifact.Protocol,
			Notifies = artifact.Notifies
		};

		await EntityCollection.ReplaceOneAsync(a => a.Id == entity.Id, entity);

		return entity;
	}
}