import { ThemeService } from "../../services/common/theme.service";
import { LocalStorageService } from "../../services/common/localStorage.service";
import { DiKeysService } from "./di.keys.service";
import { ArtifactService } from "../../services/artifact.service";
import { Container } from "inversify";
import { ProjectService } from "../../services/project.service";
import { UserService } from "../../services/user.service";
import { UpdateSocketService } from "../../services/socket/update.socket.service";

export const addServices = (container: Container) => {
	container.bind(ThemeService).toSelf();
	container.bind<LocalStorageService>(DiKeysService.localStorage.settings).toConstantValue(new LocalStorageService("elyspio-authentication-settings"));
	container.bind<LocalStorageService>(DiKeysService.localStorage.validation).toConstantValue(new LocalStorageService("elyspio-authentication-validation"));

	container.bind(ArtifactService).toSelf();
	container.bind(UserService).toSelf();
	container.bind(ProjectService).toSelf();
	container.bind(UpdateSocketService).toSelf();
};
