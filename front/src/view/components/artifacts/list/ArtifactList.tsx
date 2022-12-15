import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { ReactComponent as ProjectIcon } from "../../../icons/project.svg";
import { ReactComponent as RepositoryIcon } from "../../../icons/repository.svg";
import { SvgIcon } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { useModal } from "../../../hooks/useModal";
import { AddArtifacts } from "../add/AddArtifacts";
import { StyledTreeItem } from "../../common/StyledTreeItem";
import { groupBy } from "../../../../core/utils/array";

const ProjectIconComponent = (props: SvgIconProps) => <SvgIcon component={ProjectIcon} inheritViewBox {...props} sx={{ width: 20, height: 20 }} />;
const RepositoryIconComponent = (props: SvgIconProps) => <SvgIcon component={RepositoryIcon} inheritViewBox {...props} />;

export function ArtifactList() {
	const { managedArtifacts, feeds } = useAppSelector((s) => ({ managedArtifacts: s.artifacts.managed, feeds: s.artifacts.feeds }));

	// const allArtifacts = useMemo(() => {
	// 	console.count("allArtifacts");
	// 	let arr = [...managedArtifacts];
	// 	return groupBy(arr, "feed");
	// }, [managedArtifacts]);
	//
	// const dispatch = useAppDispatch();
	//
	// const { open, setOpen, setClose } = useModal();
	//
	// const tree = useMemo(() => {
	// 	const entries = Object.entries(allArtifacts);
	// 	if (!entries.length || !feeds.length) return null;
	// 	return (
	// 		<TreeView sx={{ width: "100%" }} defaultCollapseIcon={<ArrowDropDownIcon />} defaultExpandIcon={<ArrowRightIcon />} defaultEndIcon={<div style={{ width: 24 }} />}>
	// 			{entries.map(([feedName, artifacts]) => {
	// 				const feed = feeds.find((f) => f.name === feedName)!;
	// 				return (
	// 					<StyledTreeItem labelIcon={ProjectIconComponent} key={feed.id} nodeId={feed.id} labelText={feed.name}>
	// 						{artifacts.map((artifact) => (
	// 							<StyledTreeItem key={artifact.id} labelIcon={RepositoryIconComponent} labelText={artifact.name} nodeId={artifact.id} />
	// 						))}
	// 					</StyledTreeItem>
	// 				);
	// 			})}
	// 		</TreeView>
	// 	);
	// }, [allArtifacts, feeds]);

	return (
		<Box p={2} minWidth={400}>
			{null}
			{/*<AddArtifacts open={open} setClose={setClose} />*/}
		</Box>
	);
}
