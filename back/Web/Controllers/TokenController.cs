using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Abstractions.Transports.Token;
using AzureArtifact.Api.Web.Types.Requests;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;

namespace AzureArtifact.Api.Web.Controllers;

[Route("api/token/{organisation}")]
[ApiController]
public class TokenController : ControllerBase
{
	private readonly ITokenService _tokenService;

	public TokenController(ITokenService tokenService)
	{
		_tokenService = tokenService;
	}

	[HttpGet]
	[SwaggerResponse(HttpStatusCode.NoContent, typeof(void))]
	[SwaggerResponse(HttpStatusCode.OK, typeof(Token))]
	public async Task<IActionResult> GetToken(string organisation)
	{
		return Ok(await _tokenService.GetToken(organisation));
	}

	[HttpPost]
	[SwaggerResponse(HttpStatusCode.NoContent, typeof(void))]
	public async Task<IActionResult> SetToken(string organisation, SetTokenRequest request)
	{
		await _tokenService.SetToken(organisation, request.Pat, request.Expiration);
		return NoContent();
	}
}