import React from "react";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { Organisation } from "./Organisation";
import { Feeds } from "./Feeds";
import { SearchArtifact } from "./SearchArtifact";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { useTheme } from "@mui/styles";
import { bindActionCreators } from "redux";
import { manageArtifact } from "../../../../store/module/artifact/artifact.async.actions";

export function AddArtifact() {
	const selected = useAppSelector((s) => s.artifacts.selected);

	const {
		palette: { primary },
	} = useTheme();

	const dispatch = useAppDispatch();
	const actions = React.useMemo(() => bindActionCreators({ manageArtifact }, dispatch), [dispatch]);

	return (
		<Paper>
			<Stack p={2} m={1} spacing={4} alignItems={"center"}>
				<Typography color={primary.light} variant={"overline"} fontSize={"100%"}>
					Ajouter un artéfact
				</Typography>

				<Divider flexItem />

				<Stack spacing={2} direction={"row"}>
					<Organisation />
					<Feeds />
				</Stack>

				{selected.feed && <SearchArtifact />}

				<Divider flexItem />

				<Stack alignItems={"flex-end"}>
					<Button variant={"outlined"} color={"success"} disabled={!selected.artifact} onClick={actions.manageArtifact}>
						Ajouter
					</Button>
				</Stack>
			</Stack>
		</Paper>
	);
}
