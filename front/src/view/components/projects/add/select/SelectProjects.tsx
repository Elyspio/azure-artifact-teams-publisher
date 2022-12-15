import { useAppDispatch, useAppSelector } from "../../../../../store";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { Project } from "../../../../../core/apis/backend/generated";
import { setSelectedProject } from "../../../../../store/module/projects/projects.actions";

export function SelectProjects() {
	const { projects, selected } = useAppSelector((s) => {
		let project = s.projects.selected.project;
		return {
			projects: s.projects.all,
			selected: project ? s.projects.all[project] : null,
		};
	});

	const projectsArr = React.useMemo(() => {
		const ret = Object.values(projects);
		ret.sort((p1, p2) => p1.name.localeCompare(p2.name));
		return ret;
	}, [projects]);

	const dispatch = useAppDispatch();

	const onChange = React.useCallback(
		(e, val: Project | null) => {
			dispatch(setSelectedProject(val?.name ?? undefined));
		},
		[dispatch]
	);

	return (
		<Autocomplete
			id="project-select"
			sx={{ minWidth: 270 }}
			options={projectsArr}
			getOptionLabel={(project) => project.name}
			groupBy={(project) => project.name[0]}
			onChange={onChange}
			value={selected}
			renderInput={(params) => <TextField {...params} label="Project" />}
		/>
	);
}
