﻿using AzureArtifact.Api.Abstractions.Interfaces.Services;
using AzureArtifact.Api.Web.Technical.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using NJsonSchema;
using NSwag;
using NSwag.Generation.Processors;
using NSwag.Generation.Processors.Contexts;

namespace AzureArtifact.Api.Web.Technical.Filters;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class RequireAuthAttribute : ActionFilterAttribute
{
	private const string AuthenticationTokenField = "authentication-token";


	public async override Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
	{
		var authenticationService = context.HttpContext.RequestServices.GetService<IAuthenticationService>();

		if (authenticationService == default)
		{
			context.Result = new StatusCodeResult(500);
			throw new("Dependency injection error, Authentication Service is not available");
		}

		var cookie = context.HttpContext.Request.Cookies[AuthenticationTokenField];
		var header = context.HttpContext.Request.Headers[AuthenticationTokenField].FirstOrDefault();

		var token = cookie ?? header;

		if (token == default)
		{
			context.Result = new UnauthorizedObjectResult("Token not found");
			return;
		}


		if (!await authenticationService.IsLogged(token))
		{
			context.Result = new StatusCodeResult(403);
			return;
		}

		var username = await authenticationService.GetUsername(token);
		context.HttpContext.Request.Headers[AuthUtility.UsernameField] = username;
		context.HttpContext.Request.Headers[AuthUtility.TokenField] = token;
		await next();
	}


	public class Swagger : IOperationProcessor
	{
		public bool Process(OperationProcessorContext context)
		{
			// Get method attributes
			var attributes = context.MethodInfo.CustomAttributes.ToList();

			// Add class' attributes

			if (attributes.All(attribute => attribute.AttributeType != typeof(RequireAuthAttribute))) return true;


			context.OperationDescription.Operation.Parameters.Add(new()
				{
					Name = AuthenticationTokenField,
					Kind = OpenApiParameterKind.Header,
					IsRequired = false,
					AllowEmptyValue = true,
					Description = "Authentication Token",
					Schema = new()
					{
						Type = JsonObjectType.String
					}
				}
			);

			context.OperationDescription.Operation.Parameters.Add(new()
				{
					Name = AuthenticationTokenField,
					Kind = OpenApiParameterKind.Cookie,
					IsRequired = false,
					AllowEmptyValue = true,
					Description = "Authentication Token",
					Schema = new()
					{
						Type = JsonObjectType.String
					}
				}
			);

			context.OperationDescription.Operation.Responses.Add("401", new()
			{
				Description = "Unauthorized"
			});
			context.OperationDescription.Operation.Responses.Add("403", new()
			{
				Description = "Forbidden"
			});
			return true;
		}
	}
}