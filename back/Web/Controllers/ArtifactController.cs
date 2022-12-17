using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Web.Types.Requests;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;

namespace AzureArtifact.Api.Web.Controllers;

[Route("api/artifacts/{organization}")]
[ApiController]
public class ArtifactController : ControllerBase
{
	private readonly IArtifactService _artifactService;

	public ArtifactController(IArtifactService artifactService)
	{
		_artifactService = artifactService;
	}

	[HttpGet("feeds")]
	[SwaggerResponse(HttpStatusCode.OK, typeof(List<AzureFeed>))]
	public async Task<IActionResult> GetFeeds(string organization)
	{
		return Ok(await _artifactService.GetFeeds(organization));
	}


	[HttpGet("feeds/{feed}")]
	[SwaggerResponse(HttpStatusCode.OK, typeof(List<ArtifactInfo>))]
	public async Task<IActionResult> SearchArtifact(string organization, string feed, string query = "")
	{
		return Ok(await _artifactService.Search(organization, feed, query));
	}

	[HttpGet("managed")]
	[SwaggerResponse(HttpStatusCode.OK, typeof(List<Artifact>))]
	public async Task<IActionResult> GetAllArtifact(string organization)
	{
		return Ok(await _artifactService.GetAll(organization));
	}

	[HttpGet("managed/new")]
	[SwaggerResponse(HttpStatusCode.OK, typeof(Dictionary<ArtifactInfo, Version>))]
	public async Task<IActionResult> GetAllArtifactWithNewVersion(string organization)
	{
		return Ok(await _artifactService.GetAllWithNewVersion(organization));
	}


	[HttpPost("feeds/{feed}/managed")]
	[SwaggerResponse(HttpStatusCode.Created, typeof(Artifact))]
	public async Task<IActionResult> AddArtifact(string organization, string feed, AddArtifactRequest request)
	{
		var artifact = await _artifactService.Add(new()
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
	public async Task<IActionResult> UpdateArtifact(string organization, Guid id, ArtifactBase artifact)
	{
		artifact.Organisation = organization;
		await _artifactService.Update(id, artifact);
		return NoContent();
	}


	[HttpDelete("managed/{id:guid}")]
	[SwaggerResponse(HttpStatusCode.NoContent, typeof(void))]
	public async Task<IActionResult> DeleteArtifact(string organization, Guid id)
	{
		await _artifactService.Delete(organization, id);
		return NoContent();
	}
}