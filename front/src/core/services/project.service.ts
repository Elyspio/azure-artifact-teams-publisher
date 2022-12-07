import { inject, injectable } from "inversify";
import { BackendApi } from "../apis/backend";
import { BaseService } from "./common/base.service";

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
}
