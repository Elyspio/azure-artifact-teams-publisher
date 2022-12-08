import { createAsyncThunk } from "@reduxjs/toolkit";
import { StoreState } from "../../index";
import { getService } from "../../common/common.action";
import { UserService } from "../../../core/services/user.service";

export const searchUsers = createAsyncThunk("users/searchUser", (query: string, { extra, getState }) => {
	const userService = getService(UserService, extra);
	const {
		azure: { organisation },
	} = getState() as StoreState;

	return userService.searchUser(organisation, query);
});
