export type ConfiguredFunction = (...args: any[]) => any;

export interface SettingsOptions {
    pgHost: string
    pgPort: string
    pgDatabase: string
    pgUser: string
    pgPassword: string
    databaseURL: string
    appHost: string
    appPort: number
    [index: string]: any
}