import { inject, injectable } from "inversify";
import { BackendApi } from "../apis/backend";
import { BaseService } from "./common/base.service";
import { UserData } from "../apis/backend/generated";

@injectable()
export class ProjectService extends BaseService {
	@inject(BackendApi)
	private backendApiClient!: BackendApi;

	getAllProjects(organisation: string) {
		return this.backendApiClient.project.getAllProjects(organisation);
	}

	refreshProjects(organisation: string) {
		return this.backendApiClient.project.refreshAll(organisation);
	}

	setRepositoryMaintainers(organisation: string, repository: string, maintainers: UserData[]) {
		return this.backendApiClient.project.updateRepositoryMaintainers(organisation, repository, maintainers);
	}
}
