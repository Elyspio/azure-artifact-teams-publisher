import { createAsyncThunk } from "@reduxjs/toolkit";
import { StoreState } from "../../index";
import { getService } from "../../common/common.action";
import { AzureService } from "../../../core/services/azure.service";


export const getFeeds = createAsyncThunk("azure/getFeeds", (_, { extra, getState }) => {
	const azure = getService(AzureService, extra);
	const { azure: { organisation } } = getState() as StoreState;

	return azure.getFeeds(organisation);
});


export const searchArtifacts = createAsyncThunk("azure/searchArtifacts", (query: string, { extra, getState }) => {
	const azure = getService(AzureService, extra);
	const { azure: { organisation, selected } } = getState() as StoreState;

	return azure.searchArtifact(organisation, selected.feed!.name, query);
});


export const manageArtifact = createAsyncThunk("azure/addArtifact", (_: void, { extra, getState }) => {
	const azure = getService(AzureService, extra);
	const { azure: { selected: { artifact } } } = getState() as StoreState;
	if (!artifact) return;
	return azure.manageArtifact(artifact);

});