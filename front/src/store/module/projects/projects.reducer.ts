import { createSlice } from "@reduxjs/toolkit";
import { getProjects } from "./projects.async.actions";
import { setSelectedProject, setSelectedRepo, updateProject } from "./projects.actions";
import { ProjectState } from "./projects.types";

const initialState: ProjectState = {
	all: {},
	selected: {},
};

const slice = createSlice({
	name: "projects",
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(getProjects.fulfilled, (state, action) => {
			action.payload.forEach((project) => {
				state.all[project.name] = project;
			});
		});

		addCase(setSelectedProject, (state, action) => {
			state.selected.project = action.payload;
		});

		addCase(setSelectedRepo, (state, action) => {
			state.selected.repository = action.payload;
		});

		addCase(updateProject, (state, action) => {
			state.all[action.payload.name] = action.payload;
		});
	},
});

export const projectsReducer = slice.reducer;
