import { Options, Tag } from "swagger-jsdoc"
import { version } from "../../package.json";
import getSettings from "@src/core/utils/getSettings";

const appSettings = getSettings()

export const swaggerOptions: Options  = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Order Microservice API Docs",
            version,
        },
        servers: [
            {
                url: `http://${appSettings.variables.appHost}:${appSettings.variables.appPort}/api/v1`,
                description: "Local development server"
            }
        ],
        components: {},
        tags: [
            {
                name: "orders",
                description: "Orders API"
            },
            {
                name: "promocodes",
                description: "Promocodes API"
            },
            {
                name: "restaurants",
                description: "Restaurants API"
            },
            {
                name: "customers",
                description: "Customers API"
            },
            {
                name: "addresses",
                description: "Addresses API"
            }
        ],
    },
    apis: ['./src/modules/**/routes/*.ts']
}