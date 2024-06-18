import { getExpressApp, startExpressApp } from "./core/setup/express";
import { registerSwagger } from "./core/setup/swagger";
import { registerAppRoutes } from "./core/setup/routes";
import { registerErrorResponders } from "./core/setup/responders";
import { registerRequestParsers } from "./core/setup/parsers";
import { runKafkaReceivers } from "./core/setup/kafka/receiver";
import { initProducerEventsTopics } from "./core/setup/kafka/publisher";
import appSettings from "./core/setup/settings/appSettings";
import serverSettings from "./core/setup/settings/serverSettings";
import { registerCors } from "./core/setup/cors";

const app = getExpressApp()

async function main() {
    await runKafkaReceivers(appSettings)
    initProducerEventsTopics(appSettings)

    registerCors(app)
    registerRequestParsers(app)
    registerAppRoutes(app)
    registerSwagger(app)
    registerErrorResponders(app)

    startExpressApp(app, serverSettings)
}

main()