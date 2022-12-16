import React, { useCallback, useMemo } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { Artifact, ArtifactRepository, Project } from "../../../../core/apis/backend/generated";
import { NpmIconComponent, NugetIconComponent } from "../../../icons/Icon";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { updateManagedArtifact } from "../../../../store/module/artifact/artifact.async.actions";

type AddProjectProps = {
	data?: Artifact;
	setData: React.Dispatch<React.SetStateAction<Artifact | undefined>>;
};

const getRepoId = (repo: ArtifactRepository) => `${repo.project}.${repo.repository}`;

const getArtifactRepositories = (project: Project) => {
	const ret: ArtifactRepository[] = [];

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
		(_, repos: ArtifactRepository[]) => {
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

	if (!data) return null;

	return (
		<Dialog open={true} onClose={setClose}>
			<DialogTitle> Modifier un artéfact</DialogTitle>
			<DialogContent dividers sx={{ minWidth: 400 }}>
				<Stack m={2} spacing={2}>
					<Stack direction={"row"} spacing={2} alignItems={"center"}>
						<Typography variant={"overline"}>Feed:</Typography>
						<Typography>{data.feed}</Typography>
					</Stack>

					<Stack direction={"row"} spacing={2} alignItems={"center"}>
						<Typography variant={"overline"}>Nom:</Typography>
						<Typography>{data.name}</Typography>
					</Stack>

					<Stack direction={"row"} spacing={2} alignItems={"center"}>
						<Typography variant={"overline"}>Protocol:</Typography>
						{data.protocol === "Npm" ? <NpmIconComponent style={{ height: 40, width: 40 }} /> : <NugetIconComponent style={{ height: 40, width: 40 }} />}
					</Stack>

					<Autocomplete
						multiple
						renderInput={(params) => <TextField {...params} label={"Project related"} />}
						getOptionLabel={getRepoId}
						value={data.notifies}
						options={projectArtifact}
						onChange={updateRepositories}
						isOptionEqualToValue={(option, value) => getRepoId(option) === getRepoId(value)}
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button variant={"outlined"} color={"success"} onClick={update}>
					Valider
				</Button>
			</DialogActions>
		</Dialog>
	);
}
