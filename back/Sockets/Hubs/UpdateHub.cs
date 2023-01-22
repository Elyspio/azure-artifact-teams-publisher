using AzureArtifact.Api.Abstractions.Interfaces.Hubs;
using AzureArtifact.Api.Abstractions.Interfaces.Services;
using Microsoft.AspNetCore.SignalR;

namespace AzureArtifact.Api.Sockets.Hubs;

public class UpdateHub : Hub<IUpdateHub>
{
	private const string Organisation = "coexya-swl-sante";
	private readonly IConfigService _configService;

	public UpdateHub(IConfigService configService)
	{
		_configService = configService;
	}

	public async override Task OnConnectedAsync()
	{
		var config = await _configService.GetToken(Organisation);
		await Clients.Caller.ConfigUpdated(config!);
		await base.OnConnectedAsync();
	}
}