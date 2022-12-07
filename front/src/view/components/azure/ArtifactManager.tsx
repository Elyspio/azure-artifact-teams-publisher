import React from "react";
import { Stack } from "@mui/material";
import { AddArtifact } from "./add-artifact/AddArtifact";
import { EditProject } from "../projects/add-project/EditProject";

export function ArtifactManager() {
	return (
		<Stack justifyContent={"space-evenly"} spacing={3} direction={"row"}>
			<AddArtifact />
			<EditProject />
		</Stack>
	);
}
