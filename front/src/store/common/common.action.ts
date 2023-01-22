import { ExtraArgument } from "../index";
import { AsyncThunkFulfilledActionCreator, AsyncThunkPendingActionCreator, AsyncThunkRejectedActionCreator } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateSocketService } from "../../core/services/socket/update.socket.service";
import { deleteLocalArtifact, updateLocalManagedArtifact } from "../module/artifact/artifacts.actions";
import { updateProject } from "../module/projects/projects.actions";
import { setConfig } from "../module/config/config.reducer";

type Constructor<T> = new (...args: any[]) => T;

export function getService<T>(service: Constructor<T>, extra): T {
	const { container } = extra as ExtraArgument;
	return container.get(service);
}

type ActionCreator = AsyncThunkPendingActionCreator<any, any> | AsyncThunkRejectedActionCreator<any, any> | AsyncThunkFulfilledActionCreator<any, any>;

export function throwIfRejected(action: ReturnType<ActionCreator>) {
	if (action.meta.requestStatus === "rejected") throw new Error((action as any).error.message);
}

export const startSocket = createAsyncThunk("azure/startSocket", async (_: void, { dispatch, extra }) => {
	const updateSocketService = getService(UpdateSocketService, extra);
	const socket = await updateSocketService.getSocket();

	socket.on("ArtifactUpdated", (artifact) => {
		dispatch(updateLocalManagedArtifact(artifact));
	});

	socket.on("ArtifactDeleted", (artifact) => {
		dispatch(deleteLocalArtifact(artifact));
	});

	socket.on("ProjectUpdated", (project) => {
		dispatch(updateProject(project));
	});

	socket.on("ConfigUpdated", (config) => {
		dispatch(setConfig(config));
	});
});
