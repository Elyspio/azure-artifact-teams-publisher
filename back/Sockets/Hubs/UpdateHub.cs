using AzureArtifact.Api.Abstractions.Interfaces.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace AzureArtifact.Api.Sockets.Hubs;

public class UpdateHub : Hub<IUpdateHub>
{
}