import React, { useEffect } from "react";
import { Button, Divider, Paper, Stack, Typography, useTheme } from "@mui/material";
import { useActions } from "../../hooks/useActions";
import { getProjects } from "../../../store/module/projects/projects.async.actions";
import { useModal } from "../../hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../../store";
import { ProjectsList } from "./list/ProjectsList";
import { AddProject } from "./add/AddProject";
import { setSelectedProject } from "../../../store/module/projects/projects.actions";
import { setSelectedArtifact } from "../../../store/module/artifact/artifacts.actions";

export function Projects() {
	const { allProjects } = useAppSelector((s) => ({
		allProjects: s.projects.all,
	}));

	const dispatch = useAppDispatch();

	const { open, setOpen, setClose } = useModal();

	const actions = useActions({ setSelectedProject, setSelectedArtifact });

	const addProject = React.useCallback(() => {
		actions.setSelectedProject();
		actions.setSelectedArtifact();
		setOpen();
	}, [actions, setOpen]);

	useEffect(() => {
		dispatch(getProjects());
	}, [dispatch]);

	const {
		palette: { primary },
	} = useTheme();

	return (
		<Paper>
			<Stack p={2} m={1} spacing={4} alignItems={"center"}>
				<Typography color={primary.light} variant={"overline"} fontSize={"100%"}>
					Applications
				</Typography>

				<Divider flexItem />

				<ProjectsList />

				<Divider flexItem />

				<Stack alignItems={"flex-end"}>
					<Button variant={"outlined"} color={"primary"} onClick={addProject}>
						Ajouter
					</Button>
				</Stack>
			</Stack>
			<AddProject open={open} setClose={setClose} />
		</Paper>
	);
}
