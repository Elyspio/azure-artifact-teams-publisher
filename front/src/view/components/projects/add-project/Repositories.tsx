import { useAppDispatch, useAppSelector } from "../../../../store";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { setSelectedRepo } from "../../../../store/module/projects/projects.actions";
import { Repository } from "../../../../core/apis/backend/generated";

export function Repositories() {
	const { repositories, selected } = useAppSelector((s) => {
		let repos = s.project.all[s.project.selected.project!]?.repositories ?? [];
		return {
			repositories: repos,
			selected: repos.find((repo) => repo.name === s.project.selected.repository),
		};
	});

	const dispatch = useAppDispatch();

	const onChange = React.useCallback(
		(e, val: Repository | null) => {
			dispatch(setSelectedRepo(val?.name ?? undefined));
		},
		[dispatch]
	);

	return (
		<Autocomplete
			id="repository-select"
			sx={{ minWidth: 270 }}
			options={repositories}
			value={selected ?? null}
			onChange={onChange}
			getOptionLabel={(repo) => repo.name}
			renderInput={(params) => <TextField {...params} label="Repository" />}
		/>
	);
}
