import { inject, injectable } from "inversify";
import { BackendApi } from "../apis/backend";
import { Todo } from "../apis/backend/generated";
import { BaseService } from "./base.service";


@injectable()
export class TodoService extends BaseService {
	@inject(BackendApi)
	private backendApiClient!: BackendApi;

	public common = {
		get:  this.backendApiClient.todo.common.getAll,
		add: this.backendApiClient.todo.common.add,
		check: this.backendApiClient.todo.common.check,
		remove: this.backendApiClient.todo.common.delete,
	};

	public user = {
		get:  this.backendApiClient.todo.user.getAllForUser,
		add: this.backendApiClient.todo.user.addForUser,
		check: this.backendApiClient.todo.user.checkForUser,
		remove: this.backendApiClient.todo.user.deleteForUser,
	};
}
