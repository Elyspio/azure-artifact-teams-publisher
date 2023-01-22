import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfigState } from "./config.types";
import { Config } from "../../../core/apis/backend/generated";

const initialState: ConfigState = {
	data: {} as any,
};

const slice = createSlice({
	name: "config",
	initialState,
	reducers: {
		setConfig: (state, action: PayloadAction<Config>) => {
			state.data = action.payload;
		},
	},
	extraReducers: ({ addCase }) => {},
});

export const configReducer = slice.reducer;

export const { setConfig } = slice.actions;
