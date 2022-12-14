import { useAppDispatch, useAppSelector } from "../../../../store";
import React, { useState } from "react";
import { debounce } from "lodash";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Paper, TextField } from "@mui/material";
import { setOrganisation } from "../../../../store/module/azure/azure.actions";

export function Organisation() {
	const organisation = useAppSelector((s) => s.azure.organisation);

	const [text, setText] = useState(organisation);

	const dispatch = useAppDispatch();

	const syncOrganisation = React.useMemo(() => {
		return debounce((val: string) => {
			dispatch(setOrganisation(val));
		}, 100);
	}, [dispatch]);

	const onChange = React.useCallback((_, value: string) => {
		setText(value);
		syncOrganisation(value);
	}, []);

	return (
		<Paper sx={{ width: "100%" }}>
			<Box p={2}>
				<Autocomplete
					sx={{ minWidth: 210 }}
					id="organisation-select"
					options={["coexya-swl-sante"]}
					onChange={onChange as any}
					value={text}
					renderInput={(params) => <TextField {...params} label="Organisation" datatype={"other"} />}
				/>
			</Box>
		</Paper>
	);
}
