import { SettingsBuilder } from "@src/config/SettingsBuilder";
import { Settings } from "@src/config/Settings";
import settingsCache from "./settingsCache";

export default function getSettings(): Settings {
    return settingsCache(() => {
        const settingsBuilder = new SettingsBuilder()
        return settingsBuilder.build()
    })()
}