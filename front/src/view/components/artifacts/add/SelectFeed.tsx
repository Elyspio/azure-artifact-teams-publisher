import { useAppDispatch, useAppSelector } from "../../../../store";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { AzureFeed } from "../../../../core/apis/backend/generated";
import { setSelectedFeed } from "../../../../store/module/artifact/artifacts.actions";

export function SelectFeed() {
	const feeds = useAppSelector((s) => s.artifacts.feeds);

	const dispatch = useAppDispatch();

	const onChange = React.useCallback(
		(e: any, value: AzureFeed | null) => {
			dispatch(setSelectedFeed(value?.id ?? undefined));
		},
		[dispatch]
	);

	return (
		<Autocomplete
			fullWidth
			id="feeds-select"
			options={feeds}
			onChange={onChange}
			getOptionLabel={(feed) => feed.name}
			renderInput={(params) => <TextField {...params} label="Feed" datatype={"other"} />}
		/>
	);
}
