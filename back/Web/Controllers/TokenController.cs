using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Abstractions.Transports.Token;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;

namespace AzureArtifact.Api.Web.Controllers;

[Route("api/config/{organisation}")]
[ApiController]
public class TokenController : ControllerBase
{
	private readonly IConfigService _configService;

	public TokenController(IConfigService configService)
	{
		_configService = configService;
	}

	[HttpGet]
	[SwaggerResponse(HttpStatusCode.NoContent, typeof(void))]
	[SwaggerResponse(HttpStatusCode.OK, typeof(Config))]
	public async Task<IActionResult> GetToken(string organisation)
	{
		return Ok(await _configService.GetToken(organisation));
	}

	[HttpPost]
	[SwaggerResponse(HttpStatusCode.NoContent, typeof(void))]
	public async Task<IActionResult> SetToken(string organisation, ConfigBase config)
	{
		config.Organisation = organisation;
		await _configService.SetToken(config);
		return NoContent();
	}
}