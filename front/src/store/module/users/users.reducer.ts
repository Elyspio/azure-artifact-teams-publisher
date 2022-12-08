import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../../core/apis/backend/generated";
import { searchUsers } from "./users.async.actions";

export type ArtifactState = {
	all: UserData[];
};

const initialState: ArtifactState = {
	all: [],
};

const slice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(searchUsers.fulfilled, (state, action) => {
			for (let user of action.payload) {
				if (state.all.every((u) => u.id !== user.id)) {
					state.all.push(user);
				}
			}
		});
	},
});

export const usersReducer = slice.reducer;
