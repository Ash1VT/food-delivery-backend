import { Express } from "express"
import { apiRouter } from "../routes/api.routes"

export function registerAppRoutes(app: Express) {
    app.use("/api/v1", apiRouter)
}