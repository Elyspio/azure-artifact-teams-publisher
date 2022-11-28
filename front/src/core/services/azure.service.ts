import { inject, injectable } from "inversify";
import { BackendApi } from "../apis/backend";
import { BaseService } from "./common/base.service";


@injectable()
export class AzureService extends BaseService {
	@inject(BackendApi)
	private backendApiClient!: BackendApi;


	getFeeds(organisation: string) {
		return this.backendApiClient.artifact.getFeeds(organisation);
	}

	searchArtifact(organisation: string, feed: string, query: string) {
		return this.backendApiClient.artifact.searchArtifact(organisation, feed, query);
	}

}
