import { Request } from 'express';
import winston from 'winston';

const formatRequestForLogging = (req: Request) => ({
    method: req.method,
    requestURL: req.url,
    body: req.body,
    query: req.query
});

const formatMessForLogging = (req: Request, mess: any, statusCode: number) => ({
    ...formatRequestForLogging(req),
    errMess: mess,
    statusCode
});

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console()
    ],
    exceptionHandlers: [
        new winston.transports.Console()
    ],
    exitOnError: false
});

export {
    logger,
    formatRequestForLogging,
    formatMessForLogging
};
