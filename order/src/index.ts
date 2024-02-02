import getSettings from "./utils/getSettings";
import { getExpressApp, startExpressApp } from "./core/setup/express";
import { getPrismaClient } from "./core/setup/prisma";
import { registerSwagger } from "./core/setup/swagger";

const app = getExpressApp()
const prismaClient = getPrismaClient()
const appSettings = getSettings()

registerSwagger(app)

app.get('/', async (req, res) => {
    res.json({'message': "Hello!"})
})

startExpressApp(app, appSettings)