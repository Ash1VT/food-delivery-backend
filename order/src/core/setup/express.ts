import { Settings } from '@src/config/Settings';
import express, { Express } from 'express';

export function getExpressApp(): Express {
    return express()
}

export function startExpressApp(app: Express, settings: Settings) {
    app.listen(settings.variables.appPort, settings.variables.appHost, () => {
        console.log(`Express app started on http://${settings.variables.appHost}:${settings.variables.appPort}`)
    })
}