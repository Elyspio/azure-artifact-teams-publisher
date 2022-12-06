import { injectable } from "inversify";
import axios from "axios";
import { ArtifactClient, ProjectClient, TokenClient, UserClient } from "./generated";

const instance = axios.create({
	withCredentials: true,
	transformResponse: [],
});

@injectable()
export class BackendApi {
	token = new TokenClient(window.config.endpoints.core, instance);
	user = new UserClient(window.config.endpoints.core, instance);
	artifact = new ArtifactClient(window.config.endpoints.core, instance);
	project = new ProjectClient(window.config.endpoints.core, instance);
}
