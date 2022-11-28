import { createAction as _createAction } from "@reduxjs/toolkit";
import { AzureState } from "./azure.reducer";
import { AzureFeed } from "../../../core/apis/backend/generated";


const createAction = <T>(suffix: string) => _createAction<T>(`azure/${suffix}`);


export const setOrganisation = createAction<AzureState["organisation"]>("setOrganisation");
export const setSelectedFeed = createAction<AzureFeed["id"] | undefined>("setSelectedFeed");
