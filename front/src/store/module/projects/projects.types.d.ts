import { Project, Repository } from "../../../core/apis/backend/generated";

export type ProjectState = {
	all: Record<Project["name"], Project>;
	selected: {
		project?: Project["name"];
		repository?: Repository["name"];
	};
};
