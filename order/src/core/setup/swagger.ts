import swaggerJsdoc from 'swagger-jsdoc';
import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "@src/config/swagger";

export function registerSwagger(app: Express) {
    const swaggerSpec = swaggerJsdoc(swaggerOptions)
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}