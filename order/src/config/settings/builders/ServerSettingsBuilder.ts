import EnvManager from "@src/config/EnvManager";
import ServerSettings from "../ServerSettings";
import ISettingsBuilder from "./ISettingsBuilder";

export class ServerSettingsBuilder implements ISettingsBuilder {

    public build(): ServerSettings {
        return new ServerSettings({
            "pgHost": EnvManager.getVariable("PG_HOST"), 
            "pgPort": EnvManager.getVariable("PG_PORT"), 
            "pgDatabase": EnvManager.getVariable("PG_DATABASE"),
            "pgUser": EnvManager.getVariable("PG_USER"), 
            "pgPassword": EnvManager.getVariable("PG_PASSWORD"),
            "databaseURL": EnvManager.getVariable("DATABASE_URL"),
            "appHost": EnvManager.getVariable("APP_HOST"),
            "appPort": Number.parseInt(EnvManager.getVariable("APP_PORT")),
            "rolesGrpcServerHost": EnvManager.getVariable("ROLES_GRPC_SERVER_HOST"),
            "rolesGrpcServerPort": Number(EnvManager.getVariable("ROLES_GRPC_SERVER_PORT")),
            "grayLogHost": EnvManager.getVariable("GRAYLOG_HOST"),
            "grayLogUdpPort": Number(EnvManager.getVariable("GRAYLOG_UDP_PORT")),
        })
    }
}
