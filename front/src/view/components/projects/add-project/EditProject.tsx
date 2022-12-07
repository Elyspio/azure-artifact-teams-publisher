import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { useTheme } from "@mui/styles";
import { bindActionCreators } from "redux";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { manageArtifact } from "../../../../store/module/artifact/artifact.async.actions";
import { Projects } from "./Projects";
import { Repositories } from "./Repositories";

export function EditProject() {
	const selected = useAppSelector((s) => s.project.selected);

	const {
		palette: { primary },
	} = useTheme();

	const dispatch = useAppDispatch();
	const actions = React.useMemo(() => bindActionCreators({ manageArtifact }, dispatch), [dispatch]);

	return (
		<Paper>
			<Stack p={2} m={1} spacing={4} alignItems={"center"}>
				<Typography color={primary.light} variant={"overline"} fontSize={"100%"}>
					Modifier un projet
				</Typography>

				<Divider flexItem />

				<Stack direction={"row"} spacing={2}>
					<Projects />
					{selected.project && <Repositories/>}
				</Stack>

				<Divider flexItem />

				<Stack alignItems={"flex-end"}>
					<Button variant={"outlined"} color={"success"}>
						Sauvegarder
					</Button>
				</Stack>
			</Stack>
		</Paper>
	);
}
