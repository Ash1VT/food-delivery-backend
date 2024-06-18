import { Express } from 'express';
import cors from 'cors';

export function registerCors(app: Express) {
    const corsOptions: cors.CorsOptions = {
        origin: [
            '*',
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}