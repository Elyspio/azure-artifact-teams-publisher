import { createAsyncThunk } from "@reduxjs/toolkit";
import { StoreState } from "../../index";
import { getService } from "../../common/common.action";
import { ArtifactService } from "../../../core/services/artifact.service";

export const getFeeds = createAsyncThunk("artifacts/getFeeds", (_, { extra, getState }) => {
	const artifactService = getService(ArtifactService, extra);
	const {
		azure: { organisation },
	} = getState() as StoreState;

	return artifactService.getFeeds(organisation);
});

export const searchArtifacts = createAsyncThunk("artifacts/searchArtifacts", (query: string, { extra, getState }) => {
	const artifactService = getService(ArtifactService, extra);
	const {
		artifacts: { selected },
		azure: { organisation },
	} = getState() as StoreState;

	return artifactService.searchArtifact(organisation, selected.feed!.name, query);
});

export const manageArtifact = createAsyncThunk("artifacts/addArtifact", (_: void, { extra, getState }) => {
	const artifactService = getService(ArtifactService, extra);
	const {
		artifacts: {
			selected: { artifact },
		},
	} = getState() as StoreState;
	if (!artifact) return;
	return artifactService.manageArtifact(artifact);
});

export const getManagedArtifacts = createAsyncThunk("artifacts/getManagedArtifacts", async (_, { extra, getState }) => {
	const artifactService = getService(ArtifactService, extra);
	const {
		azure: { organisation },
	} = getState() as StoreState;

	return artifactService.getManagedArtifacts(organisation);
});
