import React, { useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useModal } from "../../../hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../../store/module/workflow/workflow.reducer";
import { EditConfigContent } from "./EditConfigContent";

export function EditConfigModal() {
	const { editConfig } = useAppSelector((s) => s.workflow.modals);

	const dispatch = useAppDispatch();

	const closeModal = useCallback(() => {
		dispatch(toggleModal("editConfig"));
	}, [dispatch]);

	return (
		<Dialog open={editConfig} onClose={closeModal}>
			<DialogTitle>Edit config</DialogTitle>
			<EditConfigContent closeModal={closeModal} />
		</Dialog>
	);
}
