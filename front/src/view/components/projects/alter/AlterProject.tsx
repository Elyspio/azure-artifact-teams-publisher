import React from "react";
import { useAppSelector } from "../../../../store";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { Repositories } from "../add/select/Repositories";
import { SelectProjects } from "../add/select/SelectProjects";
import { Maintainers } from "../add/select/Maintainers";

type AddProjectProps = {
	open: boolean;
	setClose: () => void;
};

export function AlterProject({ setClose, open }: AddProjectProps) {
	const selected = useAppSelector((s) => s.projects.selected);

	return (
		<Dialog open={open} onClose={setClose}>
			<DialogTitle> Modifier une application</DialogTitle>
			<DialogContent dividers>
				<Stack p={2} m={1} spacing={4} alignItems={"center"}>
					<Stack direction={"row"} spacing={2}>
						<SelectProjects />
						{selected.project && <Repositories />}
					</Stack>
					{selected.repository && <Maintainers />}
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button variant={"outlined"} color={"success"} onClick={setClose}>
					Valider
				</Button>
			</DialogActions>
		</Dialog>
	);
}
