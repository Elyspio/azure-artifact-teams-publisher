import React from "react";
import { Paper, Stack } from "@mui/material";
import { Organisation } from "./Organisation";
import { Feeds } from "./Feeds";
import { SearchArtifact } from "./SearchArtifact";
import { useAppSelector } from "../../../store";

export function Azure() {


	const selected = useAppSelector(s => !!s.azure.selected?.feed)

	return (
		<Paper>
			<Stack direction={"row"}>
				<Stack spacing={2} p={2} m={1}>
					<Organisation/>
					<Feeds/>
				</Stack>

				{selected && <SearchArtifact />}


			</Stack>


		</Paper>
	);
}

