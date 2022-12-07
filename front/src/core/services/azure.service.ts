import { inject, injectable } from "inversify";
import { BackendApi } from "../apis/backend";
import { BaseService } from "./common/base.service";
import { ArtifactBase } from "../apis/backend/generated";

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

	manageArtifact(artifact: ArtifactBase) {
		return this.backendApiClient.artifact.addArtifact(artifact.organisation, artifact.feed, {
			artifact: artifact.name,
			version: artifact.latestVersion,
		});
	}
}
