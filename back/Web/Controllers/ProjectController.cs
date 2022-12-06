using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Abstractions.Transports.Project;
using AzureArtifact.Api.Abstractions.Transports.User;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;

namespace AzureArtifact.Api.Web.Controllers;

[Route("api/projects/{organisation}")]
[ApiController]
public class ProjectController : ControllerBase
{
	private readonly IProjectService _projectService;

	public ProjectController(IProjectService projectService)
	{
		_projectService = projectService;
	}

	[HttpGet]
	[SwaggerResponse(HttpStatusCode.OK, typeof(List<Project>))]
	public async Task<IActionResult> GetAllProjects(string organisation)
	{
		return Ok(await _projectService.GetAll(organisation));
	}


	[HttpPatch]
	[SwaggerResponse(HttpStatusCode.NoContent, typeof(void))]
	public async Task<IActionResult> RefreshAll(string organisation)
	{
		await _projectService.RefreshAll(organisation);
		return NoContent();
	}


	[HttpPut("repositories/{repositoryId:guid}")]
	[SwaggerResponse(HttpStatusCode.NoContent, typeof(void))]
	public async Task<IActionResult> UpdateRepositoryMaintainers(string organisation, [FromRoute] Guid repositoryId, [FromBody] List<UserData> maintainers)
	{
		await _projectService.UpdateRepositoryMaintainers(organisation, repositoryId, maintainers);
		return NoContent();
	}
}