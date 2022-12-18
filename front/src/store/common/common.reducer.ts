import { ActionReducerMapBuilder, AsyncThunk, Draft } from "@reduxjs/toolkit";
import { PromiseState } from "./common.types";

export function setPromiseStatus<T, U extends string>(
	addCase: ActionReducerMapBuilder<T>["addCase"],
	thunk: AsyncThunk<any, any, any>,
	getProps: (state: Draft<T>) => Record<U, PromiseState>,
	prop: U,
	status: PromiseState[] = ["fulfilled", "pending", "rejected"]
) {
	status.forEach((promiseStatus) => {
		addCase(thunk[promiseStatus], (state, action) => {
			getProps(state)[prop] = action.meta.requestStatus;
		});
	});
}
