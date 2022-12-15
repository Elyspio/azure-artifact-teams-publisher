import { inject, injectable } from "inversify";
import { BackendApi } from "../apis/backend";
import { BaseService } from "./common/base.service";
import { ArtifactBase } from "../apis/backend/generated";

@injectable()
export class ArtifactService extends BaseService {
	@inject(BackendApi)
	private backendApiClient!: BackendApi;

	getFeeds(organisation: string) {
		return this.backendApiClient.artifact.getFeeds(organisation);
	}

	getManagedArtifacts(organisation: string) {
		return this.backendApiClient.artifact.getAllArtifact(organisation);
	}

	searchArtifact(organisation: string, feed: string, query: string) {
		return this.backendApiClient.artifact.searchArtifact(organisation, feed, query);
	}

	manageArtifact(artifact: ArtifactBase) {
		return this.backendApiClient.artifact.addArtifact(artifact.organisation, artifact.feed, {
			name: artifact.name,
			version: artifact.latestVersion,
			notifies: artifact.notifies,
			protocol: artifact.protocol,
		});
	}
}
