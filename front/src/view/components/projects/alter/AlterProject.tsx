import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { Repositories } from "../add/select/Repositories";
import { SelectProjects } from "../add/select/SelectProjects";
import { Maintainers } from "../add/select/Maintainers";
import { deleteProject } from "../../../../store/module/projects/projects.async.actions";

type AddProjectProps = {
	open: boolean;
	setClose: () => void;
};

export function AlterProject({ setClose, open }: AddProjectProps) {
	const { selected } = useAppSelector((s) => ({
		selected: s.projects.selected,
	}));

	const dispatch = useAppDispatch();

	const del = useCallback(() => {
		dispatch(deleteProject());
	}, [selected]);

	return (
		<Dialog open={open} onClose={setClose}>
			<DialogTitle> Modifier une application</DialogTitle>
			<DialogContent dividers>
				<Stack m={1} spacing={4} alignItems={"center"}>
					<Stack direction={"column"} spacing={2}>
						<SelectProjects />
						{selected.project && <Repositories />}
					</Stack>
					{selected.repository && <Maintainers />}
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button variant={"outlined"} color={"error"} onClick={del}>
					Supprimer
				</Button>

				<Button variant={"outlined"} color={"success"} onClick={setClose}>
					Valider
				</Button>
			</DialogActions>
		</Dialog>
	);
}
