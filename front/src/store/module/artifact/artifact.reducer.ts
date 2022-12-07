import { createSlice } from "@reduxjs/toolkit";
import { ArtifactBase, AzureFeed } from "../../../core/apis/backend/generated";
import { setSelectedArtifact, setSelectedFeed } from "./artifact.actions";
import { getFeeds, searchArtifacts } from "./artifact.async.actions";

export type ArtifactState = {
	feeds: AzureFeed[];
	artifacts: ArtifactBase[];

	selected: {
		feed?: AzureFeed;
		artifact?: ArtifactBase;
	};
};

const initialState: ArtifactState = {
	feeds: [],
	artifacts: [],
	selected: {},
};

const slice = createSlice({
	name: "azure",
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(setSelectedFeed, (state, action) => {
			state.selected.feed = state.feeds.find((feed) => feed.id === action.payload);
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

export const artifactReducer = slice.reducer;
