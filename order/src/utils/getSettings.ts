import { SettingsBuilder } from "../config/SettingsBuilder";
import { Settings } from "../config/Settings";
import settingsCache from "./settingsCache";

export default function getSettings(): Settings {
    return settingsCache(() => {
        const settingsBuilder = new SettingsBuilder()
        return settingsBuilder.build()
    })()
}