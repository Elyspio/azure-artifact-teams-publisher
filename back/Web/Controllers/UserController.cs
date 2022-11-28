using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Abstractions.Transports.User;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;

namespace AzureArtifact.Api.Web.Controllers;

[Route("api/users/{organisation}")]
[ApiController]
public class UserController : ControllerBase
{
	private readonly IUserService _userService;

	public UserController(IUserService userService)
	{
		_userService = userService;
	}

	[HttpGet]
	[SwaggerResponse(HttpStatusCode.OK, typeof(List<UserData>))]
	public async Task<IActionResult> Search(string organisation, string nameOrEmail)
	{
		return Ok(await _userService.SearchUsers(organisation, nameOrEmail));
	}
}