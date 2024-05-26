import { ServerSettingsBuilder } from "@src/config/settings/builders/ServerSettingsBuilder"

const settingsBuilder = new ServerSettingsBuilder()
const serverSettings = settingsBuilder.build()

export default serverSettings