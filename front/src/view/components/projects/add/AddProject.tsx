import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { SelectProjects } from "./select/SelectProjects";
import { Repositories } from "./select/Repositories";
import { Maintainers } from "./select/Maintainers";
import { addSelectedProject } from "../../../../store/module/projects/projects.async.actions";
import { useActions } from "../../../hooks/useActions";

export type ModalProps = {
	open: boolean;
	setClose: () => void;
};

export function AddProject({ setClose, open }: ModalProps) {
	const selected = useAppSelector((s) => s.projects.selected);
	const dispatch = useAppDispatch();
	const actions = useActions({ addSelectedProject });

	const validate = useCallback(() => {
		actions.addSelectedProject();
		setClose();
	}, [setClose, dispatch, actions]);

	return (
		<Dialog open={open} onClose={setClose}>
			<DialogTitle> Ajouter une application</DialogTitle>
			<DialogContent dividers>
				<Stack p={2} m={1} spacing={4} alignItems={"center"} minWidth={350}>
					<Stack spacing={2} width={"100%"}>
						<SelectProjects />
						{selected.project && <Repositories />}
					</Stack>

					{selected.repository && <Maintainers />}
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button variant={"outlined"} color={"success"} onClick={validate}>
					Valider
				</Button>
			</DialogActions>
		</Dialog>
	);
}
