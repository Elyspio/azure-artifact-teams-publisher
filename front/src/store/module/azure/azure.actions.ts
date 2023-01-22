import { createAction as _createAction } from "@reduxjs/toolkit";
import { AzureState } from "./azure.types";

const createAction = <T>(suffix: string) => _createAction<T>(`azure/${suffix}`);

export const setOrganisation = createAction<AzureState["organisation"]>("setOrganisation");
