using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Web.Types.Requests;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;

namespace AzureArtifact.Api.Web.Controllers;

[Route("api/artifacts")]
[ApiController]
public class ArtifactController : ControllerBase
{
	private readonly IArtefactService _artefactService;

	public ArtifactController(IArtefactService artefactService)
	{
		_artefactService = artefactService;
	}

	[HttpGet]
	[SwaggerResponse(HttpStatusCode.OK, typeof(List<Artifact>))]
	public async Task<IActionResult> GetAll()
	{
		return Ok(await _artefactService.GetAll());
	}

	[HttpGet("new")]
	[SwaggerResponse(HttpStatusCode.OK, typeof(Dictionary<ArtifactInfo, Version>))]
	public async Task<IActionResult> GetAllWithNewVersion()
	{
		return Ok(await _artefactService.GetAllWithNewVersion());
	}


	[HttpPost]
	[SwaggerResponse(HttpStatusCode.Created, typeof(Artifact))]
	public async Task<IActionResult> Add(AddArtifactRequest request)
	{
		var artifact = await _artefactService.Add(request.Info, request.Version);
		return Created($"api/artifacts/{artifact.Id}", artifact);
	}

	[HttpDelete("{id:guid}")]
	[SwaggerResponse(HttpStatusCode.NoContent, typeof(void))]
	public async Task<IActionResult> Delete(Guid id)
	{
		await _artefactService.Delete(id);
		return NoContent();
	}
}