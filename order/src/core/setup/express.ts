import express, { Express } from 'express';
import getLogger from './logger';
import ServerSettings from '@src/config/settings/ServerSettings';


const logger = getLogger(module)

export function getExpressApp(): Express {
    return express()
}

export function startExpressApp(app: Express, settings: ServerSettings) {
    app.listen(settings.variables.appPort, settings.variables.appHost, () => {
        logger.info(`Order Microservice started on http://${settings.variables.appHost}:${settings.variables.appPort}`)
    })
}