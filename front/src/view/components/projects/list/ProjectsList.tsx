import React, { useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { ReactComponent as ProjectIcon } from "../../../icons/project.svg";
import { ReactComponent as RepositoryIcon } from "../../../icons/repository.svg";
import { StyledTreeItem } from "./ProjectItem";
import { Stack, SvgIcon } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { Project, Repository } from "../../../../core/apis/backend/generated";
import { setSelectedProject, setSelectedRepo } from "../../../../store/module/projects/projects.actions";
import { AlterProject } from "../alter/AlterProject";
import { useModal } from "../../../hooks/useModal";

const ProjectIconComponent = (props: SvgIconProps) => <SvgIcon component={ProjectIcon} inheritViewBox {...props} sx={{ width: 20, height: 20 }} />;
const RepositoryIconComponent = (props: SvgIconProps) => <SvgIcon component={RepositoryIcon} inheritViewBox {...props} />;

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
									key={repo.id}
									labelIcon={RepositoryIconComponent}
									labelText={repo.name}
									nodeId={repo.name}
									endIcon={
										<Stack direction={"row"} mr={4}>
											<IconButton size={"small"} onClick={editMaintainers(project, repo)}>
												<Edit color={"secondary"} />
											</IconButton>
										</Stack>
									}
								/>
							))}
					</StyledTreeItem>
				))}
			</TreeView>
			<AlterProject open={open} setClose={setClose} />
		</Box>
	);
}
