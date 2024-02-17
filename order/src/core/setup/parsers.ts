import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { Express } from 'express';

export function registerRequestParsers(app: Express) {
    app.use(cookieParser())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
    }))
}