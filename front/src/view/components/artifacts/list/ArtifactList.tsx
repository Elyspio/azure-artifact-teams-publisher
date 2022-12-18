import React, { useCallback, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { useModal } from "../../../hooks/useModal";
import { StyledTreeItem } from "../../common/StyledTreeItem";
import { groupBy } from "../../../../core/utils/array";
import { Artifact, ArtifactProtocol } from "../../../../core/apis/backend/generated";
import { AddArtifacts } from "../add/AddArtifacts";
import { AlterArtifact } from "../alter/AlterArtifact";
import { ArtifactIconComponent, NpmIconComponent, NugetIconComponent } from "../../../icons/Icon";
import { Chip } from "@mui/material";

export function ArtifactList() {
	const { managedArtifacts, feeds } = useAppSelector((s) => ({ managedArtifacts: s.artifacts.managed, feeds: s.artifacts.feeds }));

	const [selectedArtifact, setSelectedArtifact] = useState<Artifact>();

	const allArtifacts = useMemo(() => {
		const ret = groupBy([...managedArtifacts], "feed");

		Object.keys(ret).forEach((key) => {
			ret[key].sort((a, b) => a.name.localeCompare(b.name));
		});

		return ret;
	}, [managedArtifacts]);

	const dispatch = useAppDispatch();

	const editArtifact = useCallback(
		(artifact: Artifact) => () => {
			setSelectedArtifact(artifact);
		},
		[dispatch]
	);

	const { open, setOpen, setClose } = useModal();

	const tree = useMemo(() => {
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
									labelText={
										<span>
											{artifact.name} <Chip component={"span"} size={"small"} label={artifact.latestVersion} />
										</span>
									}
									nodeId={artifact.id}
									level={1}
									onClick={editArtifact(artifact)}
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
			{tree}
			<AddArtifacts open={open} setClose={setClose} />
			<AlterArtifact data={selectedArtifact} setData={setSelectedArtifact} />
		</Box>
	);
}
