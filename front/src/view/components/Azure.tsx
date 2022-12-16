import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { Projects } from "./projects/Projects";
import { Artifacts } from "./artifacts/Artifacts";
import { useAppDispatch } from "../../store";
import { getFeeds, getManagedArtifacts } from "../../store/module/artifact/artifact.async.actions";
import { startSocket } from "../../store/module/azure/azure.actions";

export function Azure() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getFeeds());
		dispatch(getManagedArtifacts());
		dispatch(startSocket());
	}, [dispatch]);

	return (
		<Stack spacing={2} alignItems={"center"}>
			<Stack justifyContent={"space-evenly"} spacing={3} direction={"row"}>
				<Artifacts />
				<Projects />
			</Stack>
		</Stack>
	);
}
