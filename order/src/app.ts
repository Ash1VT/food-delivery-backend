import getSettings from "./core/utils/getSettings";
import { getExpressApp, startExpressApp } from "./core/setup/express";
import { registerSwagger } from "./core/setup/swagger";
import { registerAppRoutes } from "./core/setup/routes";
import { registerErrorResponders } from "./core/setup/responders";
import { registerRequestParsers } from "./core/setup/parsers";
import { runKafkaReceivers } from "./core/setup/kafka";

const app = getExpressApp()
const appSettings = getSettings()

async function main() {
    await runKafkaReceivers(appSettings)

    registerRequestParsers(app)
    registerAppRoutes(app)
    registerSwagger(app)
    registerErrorResponders(app)

    startExpressApp(app, appSettings)
}

main()