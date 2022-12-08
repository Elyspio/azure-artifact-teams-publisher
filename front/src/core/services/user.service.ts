import { inject, injectable } from "inversify";
import { BackendApi } from "../apis/backend";
import { BaseService } from "./common/base.service";

@injectable()
export class UserService extends BaseService {
	@inject(BackendApi)
	private backendApiClient!: BackendApi;

	searchUser(organisation: string, nameOrEmail: string) {
		return this.backendApiClient.user.search(organisation, nameOrEmail);
	}
}
