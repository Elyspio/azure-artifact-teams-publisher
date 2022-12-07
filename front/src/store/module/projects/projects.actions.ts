import { createAction as _createAction } from "@reduxjs/toolkit";
import { Project, Repository } from "../../../core/apis/backend/generated";

const createAction = <T>(suffix: string) => _createAction<T>(`projects/${suffix}`);

export const setSelectedProject = createAction<Project["idAzure"] | undefined>("setSelectedProject");
export const setSelectedRepo = createAction<Repository["id"] | undefined>("setSelectedRepo");


