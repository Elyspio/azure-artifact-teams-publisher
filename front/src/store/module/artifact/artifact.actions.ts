import { createAction as _createAction } from "@reduxjs/toolkit";
import { ArtifactInfo, AzureFeed } from "../../../core/apis/backend/generated";

const createAction = <T>(suffix: string) => _createAction<T>(`artifact/${suffix}`);

export const setSelectedFeed = createAction<AzureFeed["id"] | undefined>("setSelectedFeed");
export const setSelectedArtifact = createAction<ArtifactInfo | undefined>("setSelectedArtifact");
