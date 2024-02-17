import { Express } from 'express';
import { validationErrorResponder, appErrorResponder, grpcErrorResponder, genericErrorResponder } from '../responders/errorResponders';

export function registerErrorResponders(app: Express) {
    app.use(validationErrorResponder)
    app.use(appErrorResponder)
    app.use(grpcErrorResponder)
    app.use(genericErrorResponder)
}