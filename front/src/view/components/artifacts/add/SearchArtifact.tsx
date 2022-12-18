import { useAppDispatch, useAppSelector } from "../../../../store";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { ArtifactBase } from "../../../../core/apis/backend/generated";
import { searchArtifacts } from "../../../../store/module/artifact/artifacts.async.actions";
import { setSelectedArtifact } from "../../../../store/module/artifact/artifacts.actions";

export function SearchArtifact() {
	const dispatch = useAppDispatch();

	const { feed, artifacts } = useAppSelector((s) => ({ feed: s.artifacts.selected.feed, artifacts: s.artifacts.searchResult }));

	const onChange = React.useCallback((e: React.SyntheticEvent, value: ArtifactBase | null) => {
		dispatch(setSelectedArtifact(value ?? undefined));
	}, []);

	React.useEffect(() => {
		dispatch(searchArtifacts(""));
	}, [feed]);

	return (
		<Autocomplete
			fullWidth
			renderInput={(params) => <TextField {...params} label={"Artifacts"} datatype={"other"} />}
			options={artifacts}
			groupBy={(option) => option.name[0].toUpperCase()}
			getOptionLabel={(option) => option.name}
			onChange={onChange}
		/>
	);
}
