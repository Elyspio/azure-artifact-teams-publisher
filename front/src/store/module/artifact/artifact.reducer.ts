import { createSlice } from "@reduxjs/toolkit";
import { Artifact, ArtifactBase, AzureFeed } from "../../../core/apis/backend/generated";
import { setSelectedArtifact, setSelectedFeed, setSelectedNotifies, updateLocalManagedArtifact } from "./artifact.actions";
import { getFeeds, getManagedArtifacts, searchArtifacts } from "./artifact.async.actions";

export type ArtifactState = {
	feeds: AzureFeed[];
	searchResult: ArtifactBase[];
	managed: Artifact[];

	selected: {
		feed?: AzureFeed;
		artifact?: ArtifactBase;
	};
};

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
	},
});

export const artifactReducer = slice.reducer;
