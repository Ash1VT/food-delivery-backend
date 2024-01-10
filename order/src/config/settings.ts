import { SettingsOptions } from "../types/config.type";

export abstract class BaseSettings {
    [index: string]: any
}

export class Settings extends BaseSettings {
    pgHost: string
    pgPort: string
    pgDatabase: string
    pgUser: string
    pgPassword: string
    databaseURL: string
    
    constructor(options: SettingsOptions) {
        super()
        this.pgHost = options.pgHost
        this.pgPort = options.pgPort
        this.pgDatabase = options.pgDatabase
        this.pgUser = options.pgUser
        this.pgPassword = options.pgPassword
        this.databaseURL = options.databaseURL
    }
}