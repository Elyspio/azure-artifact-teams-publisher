import { ThemeService } from "../../services/common/theme.service";
import { LocalStorageService } from "../../services/common/localStorage.service";
import { DiKeysService } from "./di.keys.service";
import { AzureService } from "../../services/azure.service";
import { Container } from "inversify";
import { ProjectService } from "../../services/project.service";

export const addServices = (container: Container) => {
	container.bind(ThemeService).toSelf();
	container.bind<LocalStorageService>(DiKeysService.localStorage.settings).toConstantValue(new LocalStorageService("elyspio-authentication-settings"));
	container.bind<LocalStorageService>(DiKeysService.localStorage.validation).toConstantValue(new LocalStorageService("elyspio-authentication-validation"));

	container.bind(AzureService).toSelf();
	container.bind(ProjectService).toSelf();
};