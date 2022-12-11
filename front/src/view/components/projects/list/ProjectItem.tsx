import TreeItem, { treeItemClasses, TreeItemProps } from "@mui/lab/TreeItem";
import React from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
	color: theme.palette.text.secondary,
	[`& .${treeItemClasses.content}`]: {
		color: theme.palette.text.secondary,
		borderTopRightRadius: theme.spacing(2),
		borderBottomRightRadius: theme.spacing(2),
		paddingRight: theme.spacing(1),
		fontWeight: theme.typography.fontWeightMedium,
		"&.Mui-expanded": {
			fontWeight: theme.typography.fontWeightRegular,
		},
		"&:hover": {
			backgroundColor: theme.palette.action.hover,
		},
		"&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
			backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
			color: "var(--tree-view-color)",
		},
		[`& .${treeItemClasses.label}`]: {
			fontWeight: "inherit",
			color: "inherit",
		},
	},
	[`& .${treeItemClasses.group}`]: {
		marginLeft: 0,
		[`& .${treeItemClasses.content}`]: {
			paddingLeft: theme.spacing(2),
		},
	},
}));

declare module "react" {
	interface CSSProperties {
		"--tree-view-color"?: string;
		"--tree-view-bg-color"?: string;
	}
}

export function StyledTreeItem(props: StyledTreeItemProps) {
	const { bgColor, color, labelIcon: LabelIcon, labelInfo, labelText, endIcon, ...others } = props;

	return (
		<StyledTreeItemRoot
			label={
				<Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
					<Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
					<Typography variant="body2" sx={{ fontWeight: "inherit", flexGrow: 1 }}>
						{labelText}
					</Typography>
					<Typography variant="caption" color="inherit">
						{labelInfo}
					</Typography>

					<Box ml={1}>{endIcon}</Box>
				</Box>
			}
			style={{
				"--tree-view-color": color,
				"--tree-view-bg-color": bgColor,
			}}
			{...others}
		/>
	);
}

type StyledTreeItemProps = TreeItemProps & {
	bgColor?: string;
	color?: string;
	labelIcon: React.ElementType<SvgIconProps>;
	labelInfo?: string;
	labelText: string;
};
