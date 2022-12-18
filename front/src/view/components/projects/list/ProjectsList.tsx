import React, { useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { Project, Repository } from "../../../../core/apis/backend/generated";
import { setSelectedProject, setSelectedRepo } from "../../../../store/module/projects/projects.actions";
import { AlterProject } from "../alter/AlterProject";
import { useModal } from "../../../hooks/useModal";
import { StyledTreeItem } from "../../common/StyledTreeItem";
import { ProjectIconComponent, RepositoryIconComponent } from "../../../icons/Icon";

export function ProjectsList() {
	const allProjects = useAppSelector((s) => s.projects.all);
	const usedProjects = useMemo(() => Object.values(allProjects).filter((p) => p.repositories.some((r) => r.maintainers.length > 0)), [allProjects]);

	const dispatch = useAppDispatch();

	const { open, setOpen, setClose } = useModal();

	const editMaintainers = useCallback(
		(project: Project, repo: Repository) => () => {
			dispatch(setSelectedProject(project.name));
			dispatch(setSelectedRepo(repo.name));
			setOpen();
		},
		[dispatch]
	);

	return (
		<Box p={2} minWidth={400}>
			<TreeView
				sx={{ width: "100%" }}
				aria-label="gmail"
				defaultCollapseIcon={<ArrowDropDownIcon />}
				defaultExpandIcon={<ArrowRightIcon />}
				defaultEndIcon={<div style={{ width: 24 }} />}
			>
				{usedProjects.map((project) => (
					<StyledTreeItem labelIcon={ProjectIconComponent} key={project.idAzure} nodeId={project.idAzure} labelText={project.name}>
						{project.repositories
							.filter((repo) => repo.maintainers.length > 0)
							.map((repo) => (
								<StyledTreeItem
									level={1}
									key={repo.id}
									labelIcon={RepositoryIconComponent}
									labelText={repo.name}
									nodeId={repo.name}
									onClick={editMaintainers(project, repo)}
								/>
							))}
					</StyledTreeItem>
				))}
			</TreeView>
			<AlterProject open={open} setClose={setClose} />
		</Box>
	);
}
