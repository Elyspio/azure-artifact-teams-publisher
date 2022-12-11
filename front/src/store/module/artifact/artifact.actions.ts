import { createAction as _createAction } from "@reduxjs/toolkit";
import { ArtifactBase, ArtifactRepository, AzureFeed } from "../../../core/apis/backend/generated";

const createAction = <T>(suffix: string) => _createAction<T>(`artifact/${suffix}`);

export const setSelectedFeed = createAction<AzureFeed["id"] | undefined>("setSelectedFeed");
export const setSelectedArtifact = createAction<ArtifactBase | undefined>("setSelectedArtifact");

export const setSelectedNotifies = createAction<ArtifactRepository[]>("setSelectedNotifies");
