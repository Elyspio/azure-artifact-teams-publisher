import { ExtraArgument } from "../index";
import { AsyncThunkFulfilledActionCreator, AsyncThunkPendingActionCreator, AsyncThunkRejectedActionCreator } from "@reduxjs/toolkit/dist/createAsyncThunk";

type Constructor<T> = new (...args: any[]) => T;

export function getService<T>(service: Constructor<T>, extra): T {
	const { container } = extra as ExtraArgument;
	return container.get(service);
}

type ActionCreator = AsyncThunkPendingActionCreator<any, any> | AsyncThunkRejectedActionCreator<any, any> | AsyncThunkFulfilledActionCreator<any, any>;

export function throwIfRejected(action: ReturnType<ActionCreator>) {
	if (action.meta.requestStatus === "rejected") throw new Error((action as any).error.message);
}
