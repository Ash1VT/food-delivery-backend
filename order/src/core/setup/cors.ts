import { Express } from 'express';
import cors from 'cors';

export function registerCors(app: Express) {
    const corsOptions: cors.CorsOptions = {
        origin: [
            'http://localhost:3000',
            'http://192.168.0.101:3000'
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}