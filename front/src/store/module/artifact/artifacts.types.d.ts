import { Artifact, ArtifactBase, AzureFeed } from "../../../core/apis/backend/generated";

export type ArtifactState = {
	feeds: AzureFeed[];
	searchResult: ArtifactBase[];
	managed: Artifact[];

	selected: {
		feed?: AzureFeed;
		artifact?: ArtifactBase;
	};
};
