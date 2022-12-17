using AzureArtifact.Api.Abstractions.Common.Assemblers;
using AzureArtifact.Api.Abstractions.Transports.User;
using AzureArtifact.Api.Adapters.Types.Responses;

namespace AzureArtifact.Api.Core.Assemblers;

public class UserAssembler : BaseAssembler<UserData, Identity>
{
	public override Identity Convert(UserData obj)
	{
		throw new NotImplementedException();
	}

	public override UserData Convert(Identity obj)
	{
		return new()
		{
			Id = obj.EntityId,
			Mail = obj.Mail,
			Name = obj.DisplayName
		};
	}
}