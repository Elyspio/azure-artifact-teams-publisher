import { createSlice } from "@reduxjs/toolkit";
import { deleteLocalArtifact, setSelectedArtifact, setSelectedFeed, setSelectedNotifies, updateLocalManagedArtifact } from "./artifacts.actions";
import { getFeeds, getManagedArtifacts, searchArtifacts } from "./artifacts.async.actions";
import { ArtifactState } from "./artifacts.types";

const initialState: ArtifactState = {
	feeds: [],
	searchResult: [],
	managed: [],
	selected: {},
};

const slice = createSlice({
	name: "azure",
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(setSelectedFeed, (state, action) => {
			state.selected.feed = state.feeds.find((feed) => feed.id === action.payload);
			state.selected.artifact = undefined;
		});

		addCase(getFeeds.fulfilled, (state, action) => {
			state.feeds = action.payload;
		});

		addCase(searchArtifacts.fulfilled, (state, action) => {
			state.searchResult = action.payload.map((artifact) => ({ ...artifact, notifies: [] }));
		});

		addCase(setSelectedArtifact, (state, action) => {
			state.selected.artifact = action.payload;
		});
		addCase(setSelectedNotifies, (state, action) => {
			if (state.selected.artifact) {
				state.selected.artifact.notifies = action.payload;
			}
		});

		addCase(getManagedArtifacts.fulfilled, (state, action) => {
			state.managed = action.payload;
		});

		addCase(updateLocalManagedArtifact, (state, action) => {
			state.managed = state.managed.filter((artifact) => artifact.id !== action.payload.id);
			state.managed.push(action.payload);
		});

		addCase(deleteLocalArtifact, (state, action) => {
			state.managed = state.managed.filter((artifact) => artifact.id !== action.payload);
		});
	},
});

export const artifactsReducer = slice.reducer;
