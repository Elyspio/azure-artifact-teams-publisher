import { createAsyncThunk } from "@reduxjs/toolkit";
import { StoreState } from "../../index";
import { getService } from "../../common/common.action";
import { ProjectService } from "../../../core/services/project.service";
import { UserData } from "../../../core/apis/backend/generated";

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

export const addMaintainer = createAsyncThunk("projects/addMaintainer", async (user: UserData, { extra, getState, dispatch }) => {
	const projectService = getService(ProjectService, extra);

	const {
		azure: { organisation },
		projects: { all, selected },
	} = getState() as StoreState;

	if (selected.project && selected.repository) {
		let repository = all[selected.project!].repositories.find((repo) => repo.name === selected.repository)!;

		// Remove duplicate by using a Map
		const maintainers: Record<UserData["id"], UserData> = {
			[user.id]: user,
		};
		repository.maintainers.forEach((maintainer) => {
			maintainers[maintainer.id] = maintainer;
		});

		await projectService.setRepositoryMaintainers(organisation, repository.id, Object.values(maintainers));

		await dispatch(getProjects());
	}
});

export const removeMaintainer = createAsyncThunk("projects/addMaintainer", async (idUser: UserData["id"], { extra, getState, dispatch }) => {
	const projectService = getService(ProjectService, extra);

	const {
		azure: { organisation },
		projects: { all, selected },
	} = getState() as StoreState;

	if (selected.project && selected.repository) {
		let repository = all[selected.project!].repositories.find((repo) => repo.name === selected.repository)!;

		await projectService.setRepositoryMaintainers(
			organisation,
			repository.id,
			repository.maintainers.filter((user) => user.id !== idUser)
		);

		await dispatch(getProjects());
	}
});

export const addSelectedProject = createAsyncThunk("projects/addSelectedProject", async (_, { extra, getState, dispatch }) => {
	const projectService = getService(ProjectService, extra);

	const {
		azure: { organisation },
		projects: { all, selected },
	} = getState() as StoreState;

	if (selected.project && selected.repository) {
		let repository = all[selected.project!].repositories.find((repo) => repo.name === selected.repository)!;

		await projectService.setRepositoryMaintainers(organisation, repository.id, repository.maintainers);

		await dispatch(getProjects());
	}
});
