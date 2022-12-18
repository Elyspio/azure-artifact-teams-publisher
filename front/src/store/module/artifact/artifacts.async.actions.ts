import { createAsyncThunk } from "@reduxjs/toolkit";
import { StoreState } from "../../index";
import { getService } from "../../common/common.action";
import { ArtifactService } from "../../../core/services/artifact.service";
import { Artifact } from "../../../core/apis/backend/generated";
import { toast } from "react-toastify";

export const getFeeds = createAsyncThunk("artifacts/getFeeds", (_, { extra, getState }) => {
	const artifactService = getService(ArtifactService, extra);
	const {
		azure: { organisation },
	} = getState() as StoreState;

	return artifactService.getFeeds(organisation);
});

export const searchArtifacts = createAsyncThunk("artifacts/searchArtifacts", (query: string, { extra, getState }) => {
	const artifactService = getService(ArtifactService, extra);
	const {
		artifacts: { selected },
		azure: { organisation },
	} = getState() as StoreState;

	return artifactService.searchArtifact(organisation, selected.feed!.name, query);
});

export const manageArtifact = createAsyncThunk("artifacts/addArtifact", (_: void, { extra, getState }) => {
	const artifactService = getService(ArtifactService, extra);
	const {
		artifacts: {
			selected: { artifact },
		},
	} = getState() as StoreState;
	if (!artifact) return;
	return artifactService.managed.add(artifact);
});

export const getManagedArtifacts = createAsyncThunk("artifacts/getManagedArtifacts", async (_, { extra, getState }) => {
	const artifactService = getService(ArtifactService, extra);
	const {
		azure: { organisation },
	} = getState() as StoreState;

	return artifactService.managed.getAll(organisation);
});

export const updateManagedArtifact = createAsyncThunk("artifacts/updateManagedArtifact", async (artifact: Artifact, { extra }) => {
	const artifactService = getService(ArtifactService, extra);
	return toast.promise(artifactService.managed.update(artifact), {
		error: `Impossible de modifier l'artéfact ${artifact.name}`,
		pending: "Sauvegarde en cours",
		success: "Sauvegarde terminée",
	});
});

export const deleteManagedArtifact = createAsyncThunk("artifacts/deleteManagedArtifact", async (artifact: Artifact, { extra }) => {
	const artifactService = getService(ArtifactService, extra);
	return toast.promise(artifactService.managed.delete(artifact), {
		error: `Impossible de supprimer l'artéfact ${artifact.name}`,
		pending: "Suppression en cours",
		success: "Suppression terminée",
	});
});
