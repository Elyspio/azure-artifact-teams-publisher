using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Adapters.Types.Responses;
using AzureArtifact.Api.Web.Types.Requests;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;

namespace AzureArtifact.Api.Web.Controllers;

[Route("api/artifacts/")]
[ApiController]
public class ArtifactController : ControllerBase
{
	private readonly IArtefactService _artefactService;

	public ArtifactController(IArtefactService artefactService)
	{
		_artefactService = artefactService;
	}

	[HttpGet("{organisation}/feeds")]
	[SwaggerResponse(HttpStatusCode.OK, typeof(List<AzureFeed>))]
	public async Task<IActionResult> GetFeeds(string organisation)
	{
		return Ok(await _artefactService.GetFeeds(organisation));
	}


	[HttpGet("{organisation}/feeds/{feed}")]
	[SwaggerResponse(HttpStatusCode.OK, typeof(List<ArtifactInfo>))]
	public async Task<IActionResult> SearchArtifact(string organisation, string feed, string query)
	{
		return Ok(await _artefactService.Search(organisation, feed, query));
	}

	[HttpGet("{organisation}/managed")]
	[SwaggerResponse(HttpStatusCode.OK, typeof(List<ArtifactBase>))]
	public async Task<IActionResult> GetAllArtifact(string organisation)
	{
		return Ok(await _artefactService.GetAll(organisation));
	}

	[HttpGet("{organisation}/managed/new")]
	[SwaggerResponse(HttpStatusCode.OK, typeof(Dictionary<ArtifactInfo, Version>))]
	public async Task<IActionResult> GetAllArtifactWithNewVersion(string organisation)
	{
		return Ok(await _artefactService.GetAllWithNewVersion(organisation));
	}


	[HttpPost("{organisation}/feeds/{feed}/managed")]
	[SwaggerResponse(HttpStatusCode.Created, typeof(Artifact))]
	public async Task<IActionResult> AddArtifact(string organisation, string feed, AddArtifactRequest request)
	{
		var artifact = await _artefactService.Add(organisation, new ArtifactInfo
		{
			Organisation = organisation,
			Name = request.artifact,
			Feed = feed
		}, request.Version);
		return Created($"api/artifacts/{artifact.Id}", artifact);
	}

	[HttpDelete("/managed/{id:guid}")]
	[SwaggerResponse(HttpStatusCode.NoContent, typeof(void))]
	public async Task<IActionResult> DeleteArtifact(string organisation, Guid id)
	{
		await _artefactService.Delete(organisation, id);
		return NoContent();
	}
}