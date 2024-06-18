import { Express } from 'express';
import cors from 'cors';

export function registerCors(app: Express) {
    const corsOptions: cors.CorsOptions = {
        origin: [
            "https://ash1vt.github.io",
            "http://localhost:3000",
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}