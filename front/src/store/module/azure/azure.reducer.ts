import { createSlice } from "@reduxjs/toolkit";
import { setOrganisation, setSelectedArtifact, setSelectedFeed } from "./azure.actions";
import { getFeeds, searchArtifacts } from "./azure.async.actions";
import { ArtifactBase, AzureFeed } from "../../../core/apis/backend/generated";

export type AzureState = {
	organisation: string
	feeds: AzureFeed[]
	artifacts: ArtifactBase[]

	selected: {
		feed?: AzureFeed,
		artifact?: ArtifactBase
	}
};

const initialState: AzureState = {
	organisation: "coexya-swl-sante",
	feeds: [],
	artifacts: [],
	selected: {},
};

const slice = createSlice({
	name: "azure",
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(setOrganisation, (state, action) => {
			state.organisation = action.payload;
		});
		addCase(setSelectedFeed, (state, action) => {
			state.selected.feed = state.feeds.find(feed => feed.id === action.payload);
		});

		addCase(getFeeds.fulfilled, (state, action) => {
			state.feeds = action.payload;
		});

		addCase(searchArtifacts.fulfilled, (state, action) => {
			state.artifacts = action.payload;
		});

		addCase(setSelectedArtifact, (state, action) => {
			state.selected.artifact = action.payload;
		});

	},
});

export const azureReducer = slice.reducer;
