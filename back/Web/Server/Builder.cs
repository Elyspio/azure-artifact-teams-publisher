using AzureArtifact.Api.Abstractions.Common.Helpers;
using AzureArtifact.Api.Abstractions.Interfaces.Injections;
using AzureArtifact.Api.Adapters.Injections;
using AzureArtifact.Api.Core.Injections;
using AzureArtifact.Api.Db.Injections;
using AzureArtifact.Api.Web.Technical.Filters;
using AzureArtifact.Api.Web.Technical.Processors;
using AzureArtifact.Api.Web.Technical.Utils;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Newtonsoft.Json.Converters;
using NJsonSchema.Generation;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;
using System.Net;
using System.Text.Json.Serialization;

namespace AzureArtifact.Api.Web.Server;

public class ServerBuilder
{
	private readonly string appPath = "/example";
	private readonly string frontPath = Env.Get("FRONT_PATH", "/front");

	public ServerBuilder(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);
		builder.WebHost.ConfigureKestrel((_, options) =>
			{
				options.Listen(IPAddress.Any, 4000, listenOptions =>
					{
						// Use HTTP/3
						listenOptions.Protocols = HttpProtocols.Http1AndHttp2;
					}
				);
			}
		);


		// Setup CORS
		builder.Services.AddCors(options =>
			{
				options.AddPolicy("Cors", b =>
					{
						b.AllowAnyOrigin();
						b.AllowAnyHeader();
						b.AllowAnyMethod();
					}
				);

				options.DefaultPolicyName = "Cors";
			}
		);


		// Setup Logging
		builder.Host.UseSerilog((_, lc) => lc
			.Enrich.FromLogContext()
			.WriteTo.Console(LogEventLevel.Verbose, "[{Timestamp:HH:mm:ss} {Level}{Caller}] {Message:lj}{NewLine}{Exception}", theme: AnsiConsoleTheme.Code)
		);
		builder.Services.AddModule<AdapterModule>(builder.Configuration);
		builder.Services.AddModule<CoreModule>(builder.Configuration);
		builder.Services.AddModule<DatabaseModule>(builder.Configuration);

		// Convert Enum to String 
		builder.Services.AddControllers(o =>
				{
					o.Conventions.Add(new ControllerDocumentationConvention());
					o.OutputFormatters.RemoveType<StringOutputFormatter>();
				}
			)
			.AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()))
			.AddNewtonsoftJson(x => x.SerializerSettings.Converters.Add(new StringEnumConverter()));

		// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddOpenApiDocument(document =>
		{
			document.DocumentName = "AzureArtifact.Api";
			document.Title = "AzureArtifact.Api";
			document.DefaultResponseReferenceTypeNullHandling = ReferenceTypeNullHandling.NotNull;
			document.SchemaProcessors.Add(new NullableSchemaProcessor());
			document.OperationProcessors.Add(new NullableOperationProcessor());
			document.OperationProcessors.Add(new RequireAuthAttribute.Swagger());
		});
		// Setup SPA Serving
		if (builder.Environment.IsProduction()) Console.WriteLine($"Server in production, serving SPA from {frontPath} folder");

		Application = builder.Build();
	}

	public WebApplication Application { get; }
}