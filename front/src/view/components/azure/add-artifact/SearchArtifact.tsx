import { useAppDispatch, useAppSelector } from "../../../../store";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { ArtifactInfo } from "../../../../core/apis/backend/generated";
import { setSelectedArtifact } from "../../../../store/module/azure/azure.actions";
import { searchArtifacts } from "../../../../store/module/azure/azure.async.actions";

export function SearchArtifact() {


	const dispatch = useAppDispatch();


	const { feed, artifacts } = useAppSelector(s => ({ feed: s.azure.selected.feed, artifacts: s.azure.artifacts }));


	const onChange = React.useCallback((e: React.SyntheticEvent, value: ArtifactInfo | null) => {
		dispatch(setSelectedArtifact(value ?? undefined));
	}, []);

	React.useEffect(() => {
		dispatch(searchArtifacts(""));
	}, [feed]);


	return <Autocomplete
		fullWidth
		renderInput={(params) => <TextField {...params} label={"Artifacts"} />}
		options={artifacts}
		groupBy={(option) => option.name[0].toUpperCase()}
		getOptionLabel={option => option.name}
		onChange={onChange} />;

}
