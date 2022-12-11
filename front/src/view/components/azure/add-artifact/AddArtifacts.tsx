import React, { useEffect } from "react";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { Feeds } from "./Feeds";
import { SearchArtifact } from "./SearchArtifact";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { useTheme } from "@mui/styles";
import { bindActionCreators } from "redux";
import { getFeeds, manageArtifact } from "../../../../store/module/artifact/artifact.async.actions";
import { LinkProjects } from "./LinkProjects";

export function AddArtifacts() {
	const selected = useAppSelector((s) => s.artifacts.selected);

	const {
		palette: { primary },
	} = useTheme();

	const dispatch = useAppDispatch();
	const actions = React.useMemo(() => bindActionCreators({ manageArtifact }, dispatch), [dispatch]);

	useEffect(() => {
		dispatch(getFeeds());
	}, [dispatch]);

	return (
		<Paper>
			<Stack p={2} m={1} spacing={4} alignItems={"center"} minWidth={600}>
				<Typography color={primary.light} variant={"overline"} fontSize={"100%"}>
					Ajouter un artéfact
				</Typography>

				<Divider flexItem />

				<Feeds />

				{selected.feed && <SearchArtifact />}

				{selected.feed && selected.artifact && <LinkProjects />}

				<Divider flexItem />

				<Stack alignItems={"flex-end"}>
					<Button variant={"outlined"} color={"success"} disabled={!selected.artifact || selected.artifact.notifies.length === 0} onClick={actions.manageArtifact}>
						Ajouter
					</Button>
				</Stack>
			</Stack>
		</Paper>
	);
}
