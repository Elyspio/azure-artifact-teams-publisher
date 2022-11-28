import { useAppDispatch, useAppSelector } from "../../../store";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Card, CardContent, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { setSelectedFeed } from "../../../store/module/azure/azure.actions";
import { AzureFeed } from "../../../core/apis/backend/generated";
import { debounce } from "lodash";
import { searchArtifacts } from "../../../store/module/azure/azure.async.actions";

export function SearchArtifact() {


	const dispatch = useAppDispatch();

	const [query, setQuery] = React.useState("");

	const { selected, artifacts } = useAppSelector(s => ({ selected: s.azure.selected, artifacts: s.azure.artifacts }))

	const fetchDebounced = React.useMemo(() => debounce((val: string) => {
		dispatch(searchArtifacts(val));
	}, 500), [dispatch])

	const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
	}, []);

	React.useEffect(() => {
		fetchDebounced(query)
	}, [selected?.feed, query, fetchDebounced])


	return <Stack spacing={3} p={2} m={1}>
		<TextField label={"Artifact"}  onChange={onChange}/>
		{artifacts.map(art => <Typography>{art}</Typography>)}
	</Stack>;
}
