import { createSlice } from "@reduxjs/toolkit";
import { searchUsers } from "./users.async.actions";
import { UserState } from "./users.types";

const initialState: UserState = {
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
