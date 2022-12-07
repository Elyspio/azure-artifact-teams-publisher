import { createAsyncThunk } from "@reduxjs/toolkit";
import { StoreState } from "../../index";
import { getService } from "../../common/common.action";
import { ProjectService } from "../../../core/services/project.service";

export const getProjects = createAsyncThunk("projects/getAvailableProjects", (_, { extra, getState }) => {
	const project = getService(ProjectService, extra);
	const {
		azure: { organisation },
	} = getState() as StoreState;

	return project.getAllProjects(organisation);
});

export const refreshProjects = createAsyncThunk("projects/getAvailableProjects", async (_, { extra, getState, dispatch }) => {
	const project = getService(ProjectService, extra);

	const {
		azure: { organisation },
	} = getState() as StoreState;

	await project.refreshProjects(organisation);

	dispatch(getProjects());
});


