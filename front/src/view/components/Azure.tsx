import React from "react";
import { Stack } from "@mui/material";
import { AddArtifacts } from "./azure/add-artifact/AddArtifacts";
import { Projects } from "./projects/Projects";

export function Azure() {
	return (
		<Stack spacing={2} alignItems={"center"}>
			{/*<Organisation />*/}
			<Stack justifyContent={"space-evenly"} spacing={3} direction={"row"}>
				<AddArtifacts />
				<Projects />
			</Stack>
		</Stack>
	);
}
