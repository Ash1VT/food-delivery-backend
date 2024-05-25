import getSettings from "./core/utils/getSettings";
import { getExpressApp, startExpressApp } from "./core/setup/express";
import { registerSwagger } from "./core/setup/swagger";
import { registerAppRoutes } from "./core/setup/routes";
import { registerErrorResponders } from "./core/setup/responders";
import { registerRequestParsers } from "./core/setup/parsers";
import { runKafkaReceivers } from "./core/setup/kafka/receiver";
import { initProducerEventsTopics } from "./core/setup/kafka/publisher";
import getLogger from "./core/setup/logger";

const logger = getLogger(module)

const app = getExpressApp()
const appSettings = getSettings()

async function main() {
    await runKafkaReceivers(appSettings)
    initProducerEventsTopics(appSettings)

    logger.info("App settings %o", appSettings)

    registerRequestParsers(app)
    registerAppRoutes(app)
    registerSwagger(app)
    registerErrorResponders(app)

    startExpressApp(app, appSettings)
}

main()