import { SettingsBuilder } from "./builders";
import { Settings } from "./settings";
import configCache from "./cache";

export default function getSettings(): Settings {
    return configCache(() => {
        const settingsBuilder = new SettingsBuilder()
        return settingsBuilder.build()
    })()
}