import { createAction as _createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AzureState } from "./azure.reducer";
import { getService } from "../../common/common.action";
import { UpdateSocketService } from "../../../core/services/socket/update.socket.service";
import { updateLocalManagedArtifact } from "../artifact/artifact.actions";
import { updateProject } from "../projects/projects.actions";

const createAction = <T>(suffix: string) => _createAction<T>(`azure/${suffix}`);

export const setOrganisation = createAction<AzureState["organisation"]>("setOrganisation");

export const startSocket = createAsyncThunk("azure/startSocket", async (_: void, { dispatch, extra }) => {
	const updateSocketService = getService(UpdateSocketService, extra);
	const socket = await updateSocketService.getSocket();

	socket.on("ArtifactUpdated", (artifact) => {
		dispatch(updateLocalManagedArtifact(artifact));
	});
	socket.on("ProjectUpdated", (project) => {
		dispatch(updateProject(project));
	});
});
