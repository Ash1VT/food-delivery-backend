import { ServerSettingsOptions } from "./types/settings";
import BaseSettings from "./BaseSettings";

export default class ServerSettings extends BaseSettings {
    
    constructor(
        public variables: ServerSettingsOptions
    ) {
        super()
    }
}
