import { Settings } from '@src/config/Settings';
import express, { Express } from 'express';
import getLogger from './logger';


const logger = getLogger(module)

export function getExpressApp(): Express {
    return express()
}

export function startExpressApp(app: Express, settings: Settings) {
    app.listen(settings.variables.appPort, settings.variables.appHost, () => {
        logger.info(`Order Microservice started on http://${settings.variables.appHost}:${settings.variables.appPort}`)
    })
}