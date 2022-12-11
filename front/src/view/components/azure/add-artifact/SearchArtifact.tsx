import { useAppDispatch, useAppSelector } from "../../../../store";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { ArtifactBase } from "../../../../core/apis/backend/generated";
import { searchArtifacts } from "../../../../store/module/artifact/artifact.async.actions";
import { setSelectedArtifact } from "../../../../store/module/artifact/artifact.actions";

export function SearchArtifact() {
	const dispatch = useAppDispatch();

	const { feed, artifacts } = useAppSelector((s) => ({ feed: s.artifacts.selected.feed, artifacts: s.artifacts.artifacts }));

	const onChange = React.useCallback((e: React.SyntheticEvent, value: ArtifactBase | null) => {
		dispatch(setSelectedArtifact(value ?? undefined));
	}, []);

	React.useEffect(() => {
		dispatch(searchArtifacts(""));
	}, [feed]);

	return (
		<Autocomplete
			fullWidth
			renderInput={(params) => <TextField {...params} label={"Artifacts"} />}
			options={artifacts}
			groupBy={(option) => option.name[0].toUpperCase()}
			getOptionLabel={(option) => option.name}
			onChange={onChange}
		/>
	);
}
