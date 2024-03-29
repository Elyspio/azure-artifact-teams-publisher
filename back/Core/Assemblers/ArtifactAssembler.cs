﻿using AzureArtifact.Api.Abstractions.Common.Assemblers;
using AzureArtifact.Api.Abstractions.Common.Extensions;
using AzureArtifact.Api.Abstractions.Models;
using AzureArtifact.Api.Abstractions.Transports.Artifacts;

namespace AzureArtifact.Api.Core.Assemblers;

public class ArtifactAssembler : BaseAssembler<Artifact, ArtifactEntity>
{
	public override Artifact Convert(ArtifactEntity obj)
	{
		return new()
		{
			Id = obj.Id.AsGuid(),
			Feed = obj.Feed,
			Organisation = obj.Organisation,
			Name = obj.Name,
			LatestVersion = obj.LatestVersion,
			Notifies = obj.Notifies,
			Protocol = obj.Protocol
		};
	}

	public override ArtifactEntity Convert(Artifact obj)
	{
		return new()
		{
			Id = obj.Id.AsObjectId(),
			Feed = obj.Feed,
			Organisation = obj.Organisation,
			Name = obj.Name,
			LatestVersion = obj.LatestVersion,
			Notifies = obj.Notifies,
			Protocol = obj.Protocol
		};
	}
}