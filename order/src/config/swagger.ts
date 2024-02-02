import { Options } from "swagger-jsdoc"
import { version } from "../../package.json";

export const swaggerOptions: Options  = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Order Microservice API Docs",
            version,
        },
    },
    apis: []
}