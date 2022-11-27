using AzureArtifact.Api.Abstractions.Common.Assemblers;
using AzureArtifact.Api.Abstractions.Common.Extensions;
using AzureArtifact.Api.Abstractions.Models;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;

namespace AzureArtifact.Api.Core.Assemblers;

public class ArtifactAssembler : BaseAssembler<Artifact, ArtifactEntity>
{
	public override Artifact Convert(ArtifactEntity obj)
	{
		return new Artifact
		{
			Id = obj.Id.AsGuid(),
			FeedId = obj.FeedId,
			Organisation = obj.Organisation,
			Name = obj.Name,
			LatestVersion = obj.LatestVersion
		};
	}

	public override ArtifactEntity Convert(Artifact obj)
	{
		return new ArtifactEntity
		{
			Id = obj.Id.AsObjectId(),
			FeedId = obj.FeedId,
			Organisation = obj.Organisation,
			Name = obj.Name,
			LatestVersion = obj.LatestVersion
		};
	}
}