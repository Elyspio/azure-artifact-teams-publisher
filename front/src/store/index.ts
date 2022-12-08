import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { themeReducer } from "./module/theme/theme.reducer";
import { container } from "../core/di";
import { artifactReducer } from "./module/artifact/artifact.reducer";
import { projectsReducer } from "./module/projects/projects.reducer";
import { azureReducer } from "./module/azure/azure.reducer";
import { usersReducer } from "./module/users/users.reducer";

const store = configureStore({
	reducer: {
		theme: themeReducer,
		artifacts: artifactReducer,
		azure: azureReducer,
		projects: projectsReducer,
		users: usersReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: { container } as ExtraArgument } }),
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ExtraArgument = { container: typeof container };

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default store;
