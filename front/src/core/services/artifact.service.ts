import { inject, injectable } from "inversify";
import { BackendApi } from "../apis/backend";
import { BaseService } from "./common/base.service";
import { Artifact, ArtifactBase } from "../apis/backend/generated";

@injectable()
export class ArtifactService extends BaseService {
	@inject(BackendApi)
	private backendApiClient!: BackendApi;
	managed = {
		getAll: (organisation: string) => {
			return this.backendApiClient.artifact.getAllArtifact(organisation);
		},
		add: (artifact: ArtifactBase) => {
			return this.backendApiClient.artifact.addArtifact(artifact.organisation, artifact.feed, {
				name: artifact.name,
				version: artifact.latestVersion,
				notifies: artifact.notifies,
				protocol: artifact.protocol,
			});
		},
		update: (artifact: Artifact) => {
			return this.backendApiClient.artifact.updateArtifact(artifact.organisation, artifact.id, artifact);
		},
		delete: (artifact: Artifact) => {
			return this.backendApiClient.artifact.deleteArtifact(artifact.organisation, artifact.id);
		},
	};

	getFeeds(organisation: string) {
		return this.backendApiClient.artifact.getFeeds(organisation);
	}

	searchArtifact(organisation: string, feed: string, query: string) {
		return this.backendApiClient.artifact.searchArtifact(organisation, feed, query);
	}
}
