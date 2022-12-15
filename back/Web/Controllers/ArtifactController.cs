using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Adapters.Types.Responses;
using AzureArtifact.Api.Web.Types.Requests;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;

namespace AzureArtifact.Api.Web.Controllers;

[Route("api/artifacts/{organization}")]
[ApiController]
public class ArtifactController : ControllerBase
{
	private readonly IArtefactService _artefactService;

	public ArtifactController(IArtefactService artefactService)
	{
		_artefactService = artefactService;
	}

	[HttpGet("feeds")]
	[SwaggerResponse(HttpStatusCode.OK, typeof(List<AzureFeed>))]
	public async Task<IActionResult> GetFeeds(string organization)
	{
		return Ok(await _artefactService.GetFeeds(organization));
	}


	[HttpGet("feeds/{feed}")]
	[SwaggerResponse(HttpStatusCode.OK, typeof(List<ArtifactInfo>))]
	public async Task<IActionResult> SearchArtifact(string organization, string feed, string query = "")
	{
		return Ok(await _artefactService.Search(organization, feed, query));
	}

	[HttpGet("managed")]
	[SwaggerResponse(HttpStatusCode.OK, typeof(List<Artifact>))]
	public async Task<IActionResult> GetAllArtifact(string organization)
	{
		return Ok(await _artefactService.GetAll(organization));
	}

	[HttpGet("managed/new")]
	[SwaggerResponse(HttpStatusCode.OK, typeof(Dictionary<ArtifactInfo, Version>))]
	public async Task<IActionResult> GetAllArtifactWithNewVersion(string organization)
	{
		return Ok(await _artefactService.GetAllWithNewVersion(organization));
	}


	[HttpPost("feeds/{feed}/managed")]
	[SwaggerResponse(HttpStatusCode.Created, typeof(Artifact))]
	public async Task<IActionResult> AddArtifact(string organization, string feed, AddArtifactRequest request)
	{
		var artifact = await _artefactService.Add(new ArtifactBase
		{
			Organisation = organization,
			Feed = feed,
			LatestVersion = request.Version,
			Name = request.Name,
			Notifies = request.Notifies,
			Protocol = request.Protocol
		});
		return Created($"api/artifacts/{artifact.Id}", artifact);
	}

	[HttpPut("managed/{id:guid}")]
	[SwaggerResponse(HttpStatusCode.NoContent, typeof(void))]
	public async Task<IActionResult> UpdateArtifact(string organization, Guid id,  ArtifactBase artifact)
	{
		 await _artefactService.Update(organization, id,  artifact);
		return NoContent();
	}

	
	[HttpDelete("managed/{id:guid}")]
	[SwaggerResponse(HttpStatusCode.NoContent, typeof(void))]
	public async Task<IActionResult> DeleteArtifact(string organization, Guid id)
	{
		await _artefactService.Delete(organization, id);
		return NoContent();
	}
}