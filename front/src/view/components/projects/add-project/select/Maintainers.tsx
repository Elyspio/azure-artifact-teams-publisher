import React, { useMemo } from "react";
import { Box, IconButton, List, ListItem, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../../../../store";
import { Add, DeleteForever } from "@mui/icons-material";
import { useModal } from "../../../../hooks/useModal";
import { AddMaintainerDialog } from "../AddMaintainerDialog";
import { useActions } from "../../../../hooks/useActions";
import { removeMaintainer } from "../../../../../store/module/projects/projects.async.actions";
import { UserData } from "../../../../../core/apis/backend/generated";

export function Maintainers() {
	const { repo } = useAppSelector((s) => {
		let repos = s.projects.all[s.projects.selected.project!]?.repositories ?? [];
		return {
			repo: repos.find((repo) => repo.name === s.projects.selected.repository),
		};
	});

	const { open, setOpen, setClose } = useModal();

	const actions = useActions({ removeMaintainer });

	const deleteMaintainer = React.useCallback(
		(user: UserData) => () => {
			actions.removeMaintainer(user.id);
		},
		[actions]
	);

	const maintainers = useMemo(() => [...(repo?.maintainers ?? [])].sort((u1, u2) => u1.name.localeCompare(u2.name)), [repo]);

	if (!repo) return null;

	return (
		<Stack spacing={2} width={"100%"}>
			<List
				sx={{ width: "100%" }}
				aria-labelledby="nested-list-subheader"
				subheader={
					<Stack direction={"row"} spacing={3} alignItems={"center"}>
						<Typography variant={"overline"} fontSize={"large"}>
							Maintainers
						</Typography>
						<Box>
							<IconButton color={"primary"} size={"small"} onClick={setOpen} sx={{ border: "1px solid currentColor" }}>
								<Add />
							</IconButton>
						</Box>
					</Stack>
				}
			>
				{maintainers.map((user) => (
					<ListItem
						key={user.id}
						secondaryAction={
							<IconButton onClick={deleteMaintainer(user)}>
								<DeleteForever color={"error"} />
							</IconButton>
						}
					>
						<Typography sx={{ opacity: 0.9 }} fontSize={"medium"}>
							{user.name}
						</Typography>
					</ListItem>
				))}
			</List>

			{<AddMaintainerDialog open={open} setClose={setClose} />}
		</Stack>
	);
}
