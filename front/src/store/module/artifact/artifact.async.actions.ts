import { createAsyncThunk } from "@reduxjs/toolkit";
import { StoreState } from "../../index";
import { getService } from "../../common/common.action";
import { AzureService } from "../../../core/services/azure.service";

export const getFeeds = createAsyncThunk("artifacts/getFeeds", (_, { extra, getState }) => {
	const azure = getService(AzureService, extra);
	const {
		azure: { organisation },
	} = getState() as StoreState;

	return azure.getFeeds(organisation);
});

export const searchArtifacts = createAsyncThunk("artifacts/searchArtifacts", (query: string, { extra, getState }) => {
	const azure = getService(AzureService, extra);
	const {
		artifacts: { selected },
		azure: { organisation },
	} = getState() as StoreState;

	return azure.searchArtifact(organisation, selected.feed!.name, query);
});

export const manageArtifact = createAsyncThunk("artifacts/addArtifact", (_: void, { extra, getState }) => {
	const azure = getService(AzureService, extra);
	const {
		artifacts: {
			selected: { artifact },
		},
	} = getState() as StoreState;
	if (!artifact) return;
	return azure.manageArtifact(artifact);
});
