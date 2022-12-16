using AzureArtifact.Api.Abstractions.Interfaces.Injections;
using AzureArtifact.Api.Adapters.Configs;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AzureArtifact.Api.Adapters.Injections;

public class AdapterModule : IDotnetModule
{
	public void Load(IServiceCollection services, IConfiguration configuration)
	{
		var conf = new EndpointConfig();
		configuration.GetSection(EndpointConfig.Section).Bind(conf);

		var nsp = typeof(AdapterModule).Namespace!;
		var baseNamespace = nsp[..nsp.LastIndexOf(".", StringComparison.Ordinal)];
		services.Scan(scan => scan
			.FromAssemblyOf<AdapterModule>()
			.AddClasses(classes => classes.InNamespaces(baseNamespace + ".Adapters"))
			.AsSelf()
			.WithSingletonLifetime()
		);

		services.AddMemoryCache();
	}
}