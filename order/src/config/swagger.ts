import { Options, Tag } from "swagger-jsdoc"
import { version } from "../../package.json";

export const swaggerOptions: Options  = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Order Microservice API Docs",
            version,
        },
        servers: [
            {
                url: "http://localhost:8004/api/v1",
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
            }
        ],
    },
    apis: ['./src/modules/**/routes/*.ts']
}