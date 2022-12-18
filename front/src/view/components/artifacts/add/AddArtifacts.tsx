import React, { useCallback } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { SelectFeed } from "./SelectFeed";
import { SearchArtifact } from "./SearchArtifact";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { useTheme } from "@mui/styles";
import { bindActionCreators } from "redux";
import { manageArtifact } from "../../../../store/module/artifact/artifacts.async.actions";
import { LinkProjects } from "./LinkProjects";
import { ModalProps } from "../../projects/add/AddProject";

export function AddArtifacts({ setClose, open }: ModalProps) {
	const selected = useAppSelector((s) => s.artifacts.selected);

	const {
		palette: { primary },
	} = useTheme();

	const dispatch = useAppDispatch();
	const actions = React.useMemo(() => bindActionCreators({ manageArtifact }, dispatch), [dispatch]);

	const validate = useCallback(async () => {
		await actions.manageArtifact();
		setClose();
	}, [actions]);

	return (
		<Dialog open={open} onClose={setClose}>
			<DialogTitle>Ajouter un artéfact</DialogTitle>
			<DialogContent dividers sx={{ minWidth: 450, minHeight: 300 }}>
				<Stack spacing={2}>
					<SelectFeed />

					{selected.feed && <SearchArtifact />}
					<Box py={2}>{selected.feed && selected.artifact && <LinkProjects />}</Box>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button variant={"outlined"} color={"success"} disabled={!selected.artifact || selected.artifact.notifies.length === 0} onClick={validate}>
					Ajouter
				</Button>
			</DialogActions>
		</Dialog>
	);
}
