using AzureArtifact.Api.Abstractions.Common.Extensions;
using AzureArtifact.Api.Abstractions.Interfaces.Repositories;
using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Abstractions.Transports.Project;
using AzureArtifact.Api.Abstractions.Transports.User;
using AzureArtifact.Api.Adapters.Adapters;
using AzureArtifact.Api.Core.Assemblers;
using AzureArtifact.Api.Core.Services.Internal;
using Microsoft.Extensions.Logging;

namespace AzureArtifact.Api.Core.Services;

public class ProjectService : BaseService, IProjectService
{
	private readonly AzureDevopsAdapter _devopsAdapter;
	private readonly ILogger<ProjectService> _logger;
	private readonly IProjectRepository _projectRepository;
	private readonly ProjectAssembler _projectAssembler = new();

	public ProjectService(ITokenRepository tokenRepository, ILogger<ProjectService> logger, AzureDevopsAdapter devopsAdapter, IProjectRepository projectRepository) : base(tokenRepository, logger)
	{
		_logger = logger;
		_devopsAdapter = devopsAdapter;
		_projectRepository = projectRepository;
	}

	public async Task<List<Project>> GetAll(string organisation)
	{
		var logger = _logger.Enter();

		var projects = await _projectRepository.GetAll(organisation);

		logger.Exit();

		return _projectAssembler.Convert(projects);
	}

	public async Task RefreshAll(string organisation)
	{
		var token = await RequiredToken(organisation);

		var projects = await _devopsAdapter.GetProjects(token);

		await Parallel.ForEachAsync(projects, async (project, _) => { await _projectRepository.UpdateProject(organisation, project); });
	}

	public async Task UpdateRepositoryMaintainers(string organisation, Guid repositoryId, List<UserData> maintainers)
	{
		var logger = _logger.Enter($"{Log.Format(organisation)} {Log.Format(repositoryId)} {Log.Format(maintainers)}");

		await _projectRepository.UpdateRepositoryMaintainers(repositoryId, maintainers);
	}
}