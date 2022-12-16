import { createAction as _createAction } from "@reduxjs/toolkit";
import { Project, Repository } from "../../../core/apis/backend/generated";

const createAction = <T>(suffix: string) => _createAction<T>(`projects/${suffix}`);

export const setSelectedProject = createAction<Project["name"] | undefined>("setSelectedProject");
export const setSelectedRepo = createAction<Repository["name"] | undefined>("setSelectedRepo");

export const updateProject = createAction<Project>("updateProject");
