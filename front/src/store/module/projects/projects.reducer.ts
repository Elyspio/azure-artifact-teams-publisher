import { createSlice } from "@reduxjs/toolkit";
import { Project, Repository } from "../../../core/apis/backend/generated";
import { getProjects } from "./projects.async.actions";
import { setSelectedProject, setSelectedRepo } from "./projects.actions";

export type ProjectState = {
	all: Record<Project["name"], Project>;
	selected: {
		project?: Project["name"]
		repository?: Repository["name"]
	}
};

const initialState: ProjectState = {
	all: {},
	selected: {
	}
};

const slice = createSlice({
	name: "projects",
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(getProjects.fulfilled, (state, action) => {
			action.payload.forEach(project => {
				state.all[project.name] = project;
			})
		});

		addCase(setSelectedProject, (state, action) => {
			state.selected.project = action.payload;
		})


		addCase(setSelectedRepo, (state, action) => {
			state.selected.repository = action.payload;
		})
	},
});

export const projectsReducer = slice.reducer;
