import { createAction as _createAction } from "@reduxjs/toolkit";
import { Artifact, ArtifactBase, ArtifactRepositoryId, AzureFeed } from "../../../core/apis/backend/generated";

const createAction = <T>(suffix: string) => _createAction<T>(`artifact/${suffix}`);

export const setSelectedFeed = createAction<AzureFeed["id"] | undefined>("setSelectedFeed");
export const setSelectedArtifact = createAction<ArtifactBase | undefined>("setSelectedArtifact");

export const setSelectedNotifies = createAction<ArtifactRepositoryId[]>("setSelectedNotifies");

export const updateLocalManagedArtifact = createAction<Artifact>("updateLocalManagedArtifact");
export const deleteLocalArtifact = createAction<Artifact["id"]>("deleteLocalArtifact");
