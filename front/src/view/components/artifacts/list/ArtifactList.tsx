import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { ReactComponent as ArtifactIcon } from "../../../icons/artifact.svg";
import { ReactComponent as NpmIcon } from "../../../icons/npm.svg";
import { ReactComponent as NugetIcon } from "../../../icons/nuget.svg";
import { SvgIcon } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { useModal } from "../../../hooks/useModal";
import { StyledTreeItem } from "../../common/StyledTreeItem";
import { groupBy } from "../../../../core/utils/array";
import { ArtifactProtocol } from "../../../../core/apis/backend/generated";

const NugetIconComponent = (props: SvgIconProps) => <SvgIcon component={NugetIcon} inheritViewBox {...props} sx={{ width: 24, height: 24 }} />;
const NpmIconComponent = (props: SvgIconProps) => <SvgIcon component={NpmIcon} inheritViewBox {...props} sx={{ width: 24, height: 24 }} />;
const ArtifactIconComponent = (props: SvgIconProps) => <SvgIcon component={ArtifactIcon} inheritViewBox {...props} sx={{ width: 20, height: 20 }} />;

export function ArtifactList() {
	const { managedArtifacts, feeds } = useAppSelector((s) => ({ managedArtifacts: s.artifacts.managed, feeds: s.artifacts.feeds }));

	const allArtifacts = useMemo(() => {
		console.count("allArtifacts");
		let arr = [...managedArtifacts];
		return groupBy(arr, "feed");
	}, [managedArtifacts]);

	const dispatch = useAppDispatch();

	const { open, setOpen, setClose } = useModal();

	const tree = useMemo(() => {
		console.count("tree");
		const entries = Object.entries(allArtifacts);
		if (!entries.length || !feeds.length) return null;
		return (
			<TreeView sx={{ width: "100%" }} defaultCollapseIcon={<ArrowDropDownIcon />} defaultExpandIcon={<ArrowRightIcon />} defaultEndIcon={<div style={{ width: 24 }} />}>
				{entries.map(([feedName, artifacts]) => {
					const feed = feeds.find((f) => f.name === feedName)!;
					return (
						<StyledTreeItem labelIcon={ArtifactIconComponent} key={feed.id} nodeId={feed.id} labelText={feed.name}>
							{artifacts.map((artifact) => (
								<StyledTreeItem
									key={artifact.id}
									labelIcon={artifact.protocol === ArtifactProtocol.Npm ? NpmIconComponent : NugetIconComponent}
									labelText={artifact.name}
									nodeId={artifact.id}
									level={1}
								/>
							))}
						</StyledTreeItem>
					);
				})}
			</TreeView>
		);
	}, [allArtifacts, feeds]);

	return (
		<Box p={2} minWidth={400}>
			{null}
			{tree}
			{/*<AddArtifacts open={open} setClose={setClose} />*/}
		</Box>
	);
}
