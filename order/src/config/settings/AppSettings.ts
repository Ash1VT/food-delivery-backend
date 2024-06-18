import { AppSettingsOptions } from "./types/settings";
import BaseSettings from "./BaseSettings";

export default class AppSettings extends BaseSettings {
    
    constructor(
        public variables: AppSettingsOptions
    ) {
        super()
    }
}
