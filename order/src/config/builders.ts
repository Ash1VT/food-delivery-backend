import { BaseSettings, Settings } from "./settings";


export abstract class BaseSettingsBuilder {
    public abstract build(): BaseSettings;
}

export class SettingsBuilder extends BaseSettingsBuilder {

    public build(): Settings {
        return new Settings({
            "pgHost": process.env.PG_HOST as string, 
            "pgPort": process.env.PG_PORT as string, 
            "pgDatabase": process.env.PG_DATABASE as string,
            "pgUser": process.env.PG_USER as string, 
            "pgPassword": process.env.PG_PASSWORD as string,
            "databaseURL": process.env.DATABASE_URL as string
        })
    }
}
