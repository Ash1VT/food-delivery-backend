import { AppSettingsBuilder } from "@src/config/settings/builders/AppSettingsBuilder"

const settingsBuilder = new AppSettingsBuilder()
const appSettings = settingsBuilder.build()

export default appSettings