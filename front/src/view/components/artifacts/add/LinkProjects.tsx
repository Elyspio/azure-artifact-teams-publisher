import { useAppDispatch, useAppSelector } from "../../../../store";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { ArtifactRepositoryId } from "../../../../core/apis/backend/generated";
import { Add, Clear } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { setSelectedNotifies } from "../../../../store/module/artifact/artifacts.actions";

export function LinkProjects() {
	const dispatch = useAppDispatch();

	const { projects } = useAppSelector((s) => ({
		projects: s.projects.all,
	}));

	const [elems, setElems] = useState<ArtifactRepositoryId[]>([]);

	const managedProjects = useMemo(() => Object.values(projects).filter((p) => p.repositories.some((r) => r.maintainers.length > 0)), [projects]);

	const addElem = useCallback(() => setElems((prev) => [...prev, { project: "", repository: "" }]), []);
	const deleteElem = useCallback((elem: ArtifactRepositoryId) => () => setElems((prev) => prev.filter((e) => e.project !== elem.project)), []);

	const onChange = useCallback(
		(kind: "project" | "repository", current: ArtifactRepositoryId) => (e: React.SyntheticEvent, value: string | null) => {
			setElems((prevState) => {
				const others = prevState.filter((elem) => elem[kind] !== current[kind]);
				const elem = { ...current };
				elem[kind] = value ?? "";
				if (kind === "project") elem.repository = "";
				return [...others, elem];
			});
		},
		[]
	);

	const getRepos = useCallback((project: string) => projects[project]?.repositories.filter((repo) => repo.maintainers.length > 0) ?? [], [projects]);

	useEffect(() => {
		dispatch(setSelectedNotifies(elems));
	}, [elems]);

	return (
		<Stack spacing={2} width={"100%"}>
			<Stack direction={"row"} spacing={4}>
				<Typography>Related Projects</Typography>
				<IconButton size={"small"} sx={{ border: "1px solid currentColor" }} color={"secondary"} onClick={addElem}>
					<Add fontSize={"small"} />
				</IconButton>
			</Stack>

			{elems.map((elem) => (
				<Stack direction={"row"} spacing={2} width={"100%"} alignItems={"center"}>
					<Autocomplete
						fullWidth
						value={elem.project}
						renderInput={(params) => <TextField {...params} label={"Projet"} datatype={"other"} />}
						options={managedProjects.map((project) => project.name)}
						groupBy={(option) => option[0].toUpperCase()}
						onChange={onChange("project", elem)}
					/>
					<Autocomplete
						fullWidth
						value={elem.repository}
						renderInput={(params) => <TextField {...params} label={"Repository"} />}
						options={getRepos(elem.project).map((repo) => repo.name)}
						groupBy={(option) => option[0].toUpperCase()}
						onChange={onChange("repository", elem)}
					/>

					<Box>
						<IconButton onClick={deleteElem(elem)} color={"error"}>
							<Clear />
						</IconButton>
					</Box>
				</Stack>
			))}
		</Stack>
	);
}
