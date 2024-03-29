﻿using AzureArtifact.Api.Abstractions.Transports.Artifacts;
using AzureArtifact.Api.Abstractions.Transports.Enums;

namespace AzureArtifact.Api.Web.Types.Requests;

/// <summary>
/// </summary>
public class AddArtifactRequest
{
	/// <summary>Nom de l'artefact</summary>
	public required string Name { get; init; }

	/// <summary>Dernière version connu de l'artéfact</summary>
	public required string Version { get; init; }

	/// <summary>Identifiants des répository à notifier lors d'une update</summary>
	public required List<ArtifactRepositoryId> Notifies { get; init; }

	public required ArtifactProtocol Protocol { get; set; }
}