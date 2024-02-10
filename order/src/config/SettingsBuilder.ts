import EnvManager from "./EnvManager";
import { Settings } from "./Settings";

export abstract class BaseSettingsBuilder {
    public abstract build(): Settings;
}

export class SettingsBuilder extends BaseSettingsBuilder {

    public build(): Settings {
        return new Settings({
            "pgHost": EnvManager.getVariable("PG_HOST"), 
            "pgPort": EnvManager.getVariable("PG_PORT"), 
            "pgDatabase": EnvManager.getVariable("PG_DATABASE"),
            "pgUser": EnvManager.getVariable("PG_USER"), 
            "pgPassword": EnvManager.getVariable("PG_PASSWORD"),
            "databaseURL": EnvManager.getVariable("DATABASE_URL"),
            "appHost": EnvManager.getVariable("APP_HOST"),
            "appPort": Number.parseInt(EnvManager.getVariable("APP_PORT")),
            "rolesGrpcServerHost": EnvManager.getVariable("ROLES_GRPC_SERVER_HOST"),
            "rolesGrpcServerPort": Number(EnvManager.getVariable("ROLES_GRPC_SERVER_PORT"))
        })
    }
}
