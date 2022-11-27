using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Abstractions.Transports.Project;
using AzureArtifact.Api.Abstractions.Transports.User;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;

namespace AzureArtifact.Api.Web.Controllers;

[Route("api/projects")]
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
	public async Task<IActionResult> GetAll()
	{
		return Ok(await _projectService.GetAll());
	}


	[HttpPatch]
	[SwaggerResponse(HttpStatusCode.NoContent, typeof(void))]
	public async Task<IActionResult> RefreshAll()
	{
		await _projectService.RefreshAll();
		return NoContent();
	}


	[HttpPut("{repositoryId}")]
	[SwaggerResponse(HttpStatusCode.NoContent, typeof(void))]
	public async Task<IActionResult> UpdateRepositoryMaintainers([FromRoute] Guid repositoryId, [FromBody] List<UserData> maintainers)
	{
		await _projectService.UpdateRepositoryMaintainers(repositoryId, maintainers);
		return NoContent();
	}
}