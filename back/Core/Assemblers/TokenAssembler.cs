using AzureArtifact.Api.Abstractions.Common.Assemblers;
using AzureArtifact.Api.Abstractions.Common.Extensions;
using AzureArtifact.Api.Abstractions.Models;
using AzureArtifact.Api.Abstractions.Transports.Enums;
using AzureArtifact.Api.Abstractions.Transports.Token;

namespace AzureArtifact.Api.Core.Assemblers;

public class TokenAssembler : BaseAssembler<Token, TokenEntity>
{
	public override Token Convert(TokenEntity obj)
	{
		return new Token
		{
			Id = obj.Id.AsGuid(),
			Pat = obj.Pat,
			Expiration = obj.Expiration,
			ExpireAt = obj.Id.CreationTime.Add(obj.Expiration switch
			{
				TokenExpiration.Year => TimeSpan.FromDays(364),
				TokenExpiration.Day30 => TimeSpan.FromDays(30),
				TokenExpiration.Day60 => TimeSpan.FromDays(60),
				TokenExpiration.Day90 => TimeSpan.FromDays(90),
				_ => throw new ArgumentOutOfRangeException()
			})
		};
	}

	public override TokenEntity Convert(Token obj)
	{
		return new TokenEntity
		{
			Id = obj.Id.AsObjectId(),
			Pat = obj.Pat,
			Expiration = obj.Expiration
		};
	}
}