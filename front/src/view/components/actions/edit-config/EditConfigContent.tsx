import React, { useCallback, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useModal } from "../../../hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../../store/module/workflow/workflow.reducer";
import { useStoreState } from "../../../hooks/useStoreState";

type EditConfigContentProps = {
	closeModal: () => void;
};

export function EditConfigContent({ closeModal }: EditConfigContentProps) {
	const config = useAppSelector((s) => s.config.data);

	const [pat, setPat] = useStoreState(config.pat);
	const [webhook, setWebhook] = useStoreState(config.webhook);

	const onTextfieldChanged = useCallback(
		(type: "pat" | "webhook") => (e: React.ChangeEvent<HTMLInputElement>) => {
			if (type === "pat") setPat(e.target.value);
			if (type === "webhook") setWebhook(e.target.value);
		},
		[]
	);

	return (
		<>
			<DialogContent dividers>
				<Stack m={2} alignItems={"center"} justifyContent={"center"} spacing={2} width={350}>
					<TextField
						fullWidth
						sx={{
							"& .MuiInputBase-input": {
								overflow: "hidden",
								textOverflow: "ellipsis",
							},
						}}
						label={"PAT"}
						value={pat}
						onChange={onTextfieldChanged("pat")}
					/>
					<TextField
						fullWidth
						sx={{
							"& .MuiInputBase-input": {
								overflow: "hidden",
								textOverflow: "ellipsis",
							},
						}}
						label={"Webhook"}
						value={webhook}
						onChange={onTextfieldChanged("webhook")}
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button color={"success"} variant={"outlined"}>
					Save
				</Button>
				<Button color={"error"} onClick={closeModal}>
					Close
				</Button>
			</DialogActions>
		</>
	);
}
