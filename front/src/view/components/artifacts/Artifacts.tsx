import React from "react";
import { useAppDispatch } from "../../../store";
import { Button, Divider, Paper, Stack, Typography, useTheme } from "@mui/material";
import { ArtifactList } from "./list/ArtifactList";
import { useModal } from "../../hooks/useModal";
import { AddArtifacts } from "./add/AddArtifacts";

type ArtifactProps = {};

export function Artifacts({}: ArtifactProps) {
	const dispatch = useAppDispatch();

	const { open, setOpen, setClose } = useModal();

	const {
		palette: { primary },
	} = useTheme();

	return (
		<Paper>
			<Stack p={2} m={1} spacing={4} alignItems={"center"}>
				<Typography color={primary.light} variant={"overline"} fontSize={"100%"}>
					Artéfacts
				</Typography>

				<Divider flexItem />

				<ArtifactList />

				<Divider flexItem />

				<Stack alignItems={"flex-end"}>
					<Button variant={"outlined"} color={"success"} onClick={setOpen}>
						Ajouter
					</Button>
				</Stack>
			</Stack>

			<AddArtifacts open={open} setClose={setClose} />
		</Paper>
	);
}
