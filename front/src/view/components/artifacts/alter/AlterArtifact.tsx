import React, { useCallback, useMemo } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { Artifact, ArtifactRepositoryId, Project } from "../../../../core/apis/backend/generated";
import { NpmIconComponent, NugetIconComponent } from "../../../icons/Icon";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { deleteManagedArtifact, updateManagedArtifact } from "../../../../store/module/artifact/artifacts.async.actions";

type AddProjectProps = {
	data?: Artifact;
	setData: React.Dispatch<React.SetStateAction<Artifact | undefined>>;
};

const getRepoId = (repo: ArtifactRepositoryId) => `${repo.repository}`;

const getArtifactRepositories = (project: Project) => {
	const ret: ArtifactRepositoryId[] = [];

	for (let repository of project.repositories) {
		if (repository.maintainers.length > 0) ret.push({ project: project.name, repository: repository.name });
	}

	return ret;
};

export function AlterArtifact({ data, setData }: AddProjectProps) {
	const dispatch = useAppDispatch();

	const availableProjects = useAppSelector((s) => s.projects.all);

	const projects = useMemo(() => Object.values(availableProjects).filter((p) => p.repositories.some((r) => r.maintainers.length > 0)), [availableProjects]);

	const projectArtifact = useMemo(() => projects.map(getArtifactRepositories).flat(), [projects]);

	const setClose = useCallback(() => {
		setData(undefined);
	}, [setData]);

	const updateRepositories = useCallback(
		(_, repos: ArtifactRepositoryId[]) => {
			setData((old) => ({
				...old!,
				notifies: repos,
			}));
		},
		[setData]
	);

	const update = useCallback(async () => {
		await dispatch(updateManagedArtifact(data!));
		setClose();
	}, [dispatch, data, setClose]);

	const del = useCallback(async () => {
		await dispatch(deleteManagedArtifact(data!));
		setClose();
	}, [dispatch, data, setClose]);

	if (!data) return null;

	return (
		<Dialog open={true} onClose={setClose}>
			<DialogTitle> Modifier un artéfact</DialogTitle>
			<DialogContent dividers sx={{ minWidth: 400 }}>
				<Stack m={2} spacing={1.2}>
					<Stack direction={"row"} spacing={2} alignItems={"center"}>
						<Typography variant={"overline"}>Feed :</Typography>
						<Typography variant={"body2"}>{data.feed}</Typography>
					</Stack>

					<Stack direction={"row"} spacing={2} alignItems={"center"}>
						<Typography variant={"overline"}>Nom :</Typography>
						<Typography variant={"body2"}>{data.name}</Typography>
					</Stack>

					<Stack direction={"row"} spacing={2} alignItems={"center"}>
						<Typography variant={"overline"}>Protocole :</Typography>
						{data.protocol === "Npm" ? <NpmIconComponent style={{ height: 32, width: 32 }} /> : <NugetIconComponent style={{ height: 25, width: 25 }} />}
					</Stack>

					<Stack direction={"row"} spacing={2} alignItems={"center"}>
						<Typography variant={"overline"}>Version :</Typography>
						<Typography variant={"body2"}>{data.latestVersion}</Typography>
					</Stack>

					<Box pt={2}>
						<Autocomplete
							multiple
							renderInput={(params) => <TextField {...params} helperText={"Seul les projets avec des référents sont affichés"} label={"Projets concernés"} />}
							getOptionLabel={getRepoId}
							value={data.notifies}
							options={projectArtifact}
							onChange={updateRepositories}
							isOptionEqualToValue={(option, value) => getRepoId(option) === getRepoId(value)}
						/>
					</Box>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Stack direction={"row"} spacing={2}>
					<Button variant={"outlined"} color={"error"} onClick={del}>
						Supprimer
					</Button>

					<Button variant={"outlined"} color={"success"} onClick={update}>
						Valider
					</Button>
				</Stack>
			</DialogActions>
		</Dialog>
	);
}
