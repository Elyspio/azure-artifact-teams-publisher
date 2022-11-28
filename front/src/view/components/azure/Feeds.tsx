import { useAppDispatch, useAppSelector } from "../../../store";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { MenuItem, TextField } from "@mui/material";
import { setSelectedFeed } from "../../../store/module/azure/azure.actions";
import { AzureFeed } from "../../../core/apis/backend/generated";

export function Feeds() {

	const feeds = useAppSelector(s => s.azure.feeds);

	const dispatch = useAppDispatch();

	const onChange = React.useCallback((e: any, value: AzureFeed | null) => {
		dispatch(setSelectedFeed(value?.id ?? undefined));
	}, [dispatch]);

	return <Autocomplete
		sx={{ width: 300 }}
		id="feeds-select"
		options={feeds}
		onChange={onChange}
		getOptionLabel={feed => feed.name}
		renderInput={(params) => <TextField {...params} label="Feed" />}
	/>;
}
