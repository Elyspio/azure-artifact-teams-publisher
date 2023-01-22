import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState, WorkflowState } from "./workflow.types";

const initialState: WorkflowState = {
	modals: {
		editConfig: false,
	},
};

const slice = createSlice({
	name: "workflow",
	initialState,
	reducers: {
		toggleModal: (state, action: PayloadAction<ModalState>) => {
			state.modals[action.payload] = !state.modals[action.payload];
		},
	},
	extraReducers: ({ addCase }) => {},
});

export const workflowReducer = slice.reducer;

export const { toggleModal } = slice.actions;
