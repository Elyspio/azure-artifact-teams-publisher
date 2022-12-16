import * as signalR from "@microsoft/signalr";
import { HubConnection, LogLevel } from "@microsoft/signalr";
import { Artifact, Project } from "../../apis/backend/generated";
import { injectable } from "inversify";

interface UpdateHub extends HubConnection {
	on(event: "ArtifactUpdated", callback: (artifact: Artifact) => void);

	on(event: "ProjectUpdated", callback: (project: Project) => void);
}

@injectable()
export class UpdateSocketService {
	private hub?: UpdateHub;

	public async getSocket() {
		if (!this.hub) {
			this.hub = await this.createSocket();
		}
		return this.hub;
	}

	private async createSocket() {
		const connection = new signalR.HubConnectionBuilder()
			.withUrl(`${window.config.endpoints.core}/ws/update`)
			.configureLogging(LogLevel.Information)
			.withAutomaticReconnect({ nextRetryDelayInMilliseconds: () => 5000 })
			.build();

		await connection.start();

		return connection as UpdateHub;
	}
}
