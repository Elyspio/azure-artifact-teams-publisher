import TreeItem, { treeItemClasses, TreeItemProps } from "@mui/lab/TreeItem";
import React, { ReactNode } from "react";
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
			backgroundColor: "transparent",
			color: theme.palette.secondary.main,
		},
		"&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
			backgroundColor: `transparent`,
			// color: "var(--tree-view-color)",
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

export function StyledTreeItem({ bgColor, color, labelIcon, labelInfo, labelText, endIcon, level = 0, ...others }: StyledTreeItemProps) {
	return (
		<StyledTreeItemRoot
			sx={{
				my: level === 0 ? 1 : 0.5,
			}}
			label={
				<Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
					<Box component={labelIcon} color="inherit" sx={{ mr: 1 }} />
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
	labelText: ReactNode;
	level?: 0 | number;
};
