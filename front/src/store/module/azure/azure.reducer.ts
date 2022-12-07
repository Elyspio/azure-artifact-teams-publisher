import { createSlice } from "@reduxjs/toolkit";
import { setOrganisation } from "./azure.actions";

export type AzureState = {
	organisation: string;
};

const initialState: AzureState = {
	organisation: "coexya-swl-sante",
};

const slice = createSlice({
	name: "azure",
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(setOrganisation, (state, action) => {
			state.organisation = action.payload;
		});
	},
});

export const azureReducer = slice.reducer;
