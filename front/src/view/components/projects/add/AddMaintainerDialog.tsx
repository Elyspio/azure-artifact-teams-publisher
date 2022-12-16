import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { searchUsers } from "../../../../store/module/users/users.async.actions";
import { debounce } from "lodash";
import { addMaintainer, removeMaintainer } from "../../../../store/module/projects/projects.async.actions";
import { UserData } from "../../../../core/apis/backend/generated";
import { useActions } from "../../../hooks/useActions";

type AddMaintainerDialogProps = {
	open: boolean;
	setClose: () => void;
};

export function AddMaintainerDialog({ setClose, open }: AddMaintainerDialogProps) {
	const users = useAppSelector((s) => s.users.all);

	const dispatch = useAppDispatch();

	const actions = useActions({ searchUsers, removeMaintainer, addMaintainer });

	const onChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			let value = e.target.value;
			if (value) {
				dispatch(searchUsers(value));
			}
		},
		[dispatch]
	);
	const search = useMemo(() => debounce(onChange, 100), []);

	const onSelect = useCallback(
		(e, user: UserData | null) => {
			if (user) {
				actions.addMaintainer(user);
			}
			setClose();
		},
		[actions]
	);

	const usersSorted = useMemo(() => [...users].sort((u1, u2) => u1.name.localeCompare(u2.name)), [users]);

	return (
		<Dialog open={open} onClose={setClose} fullWidth maxWidth={"xs"}>
			<DialogTitle>Add Maintainer</DialogTitle>
			<DialogContent dividers>
				<Autocomplete
					onChange={onSelect}
					renderInput={(params) => <TextField {...params} label={"Name or email"} helperText={"Enter user's name or mail"} onChange={search} />}
					options={usersSorted}
					noOptionsText={"Enter first letters"}
					getOptionLabel={(option) => option.name}
				/>
			</DialogContent>
			<DialogActions>
				<Button color={"warning"} onClick={setClose}>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
}
