using AzureArtifact.Api.Abstractions.Interfaces.Repositories;
using AzureArtifact.Api.Abstractions.Models;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Abstractions.Transports.Project;
using AzureArtifact.Api.Abstractions.Transports.User;
using AzureArtifact.Api.Db.Repositories.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System.Collections.Concurrent;

namespace AzureArtifact.Api.Db.Repositories;

internal class ProjectRepository : BaseRepository<ProjectEntity>, IProjectRepository
{
	public ProjectRepository(IConfiguration configuration, ILogger<BaseRepository<ProjectEntity>> logger) : base(configuration, logger)
	{
	}


	public async Task UpdateProject(string organisation, Project project)
	{
		var entity = await EntityCollection.AsQueryable().FirstOrDefaultAsync(p => p.IdAzure == project.IdAzure);

		if (entity is null)
		{
			await EntityCollection.InsertOneAsync(new()
			{
				Organisation = organisation,
				Name = project.Name,
				IdAzure = project.IdAzure,
				Repositories = project.Repositories
			});
		}
		else
		{
			foreach (var repo in project.Repositories)
			{
				var entityRepo = entity.Repositories.FirstOrDefault(r => r.Id == repo.Id);
				if (entityRepo is null) entity.Repositories.Add(repo);
			}

			await EntityCollection.ReplaceOneAsync(p => p.Id == entity.Id, entity);
		}
	}

	public async Task<ProjectEntity> UpdateRepositoryMaintainers(Guid repositoryId, List<UserData> maintainers)
	{
		var entity = await EntityCollection.AsQueryable().FirstOrDefaultAsync(project => project.Repositories.Any(repo => repo.Id == repositoryId));
		if (entity is null) throw new($"Aucun projet ne contient le repo {repositoryId}");
		var repo = entity.Repositories.Find(r => r.Id == repositoryId)!;
		repo.Maintainers = maintainers;

		await EntityCollection.ReplaceOneAsync(project => project.Id == entity.Id, entity);

		return entity;
	}

	public async Task<List<ProjectEntity>> GetAll(string organisation)
	{
		return await EntityCollection.AsQueryable().Where(project => project.Organisation == organisation).ToListAsync();
	}

	public async Task<Dictionary<ArtifactRepositoryId, List<UserData>>> GetMaintainers(List<ArtifactRepositoryId> notifies)
	{
		var data = new ConcurrentDictionary<ArtifactRepositoryId, List<UserData>>();

		await Parallel.ForEachAsync(notifies, async (id, token) =>
		{
			var repositories = await EntityCollection.AsQueryable().Where(project => project.Name == id.Project).SelectMany(p => p.Repositories).ToListAsync(token);
			data[id] = repositories.First(repo => repo.Name == id.Repository).Maintainers;
		});


		return data.ToDictionary(pair => pair.Key, pair => pair.Value);
	}
}