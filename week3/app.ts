import express from 'express';
import cors from 'cors';
import { Application, Request, Response, NextFunction } from 'express';
import authRouter from './routers/auth';
import userRouter from './routers/users';
import groupRouter from './routers/groups';
import dotenv from 'dotenv';
import { formatMessForLogging, formatRequestForLogging, logger } from './utils/logger';
import checkAuthToken from './utils/authHelpers';
import AppError from './utils/AppError';

dotenv.config();

const app: Application = express();

const port: number = Number(process.env.SERVER_PORT) || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    const gerenalInfo = formatRequestForLogging(req);
    const startTime =  new Date();
    logger.info({ ...gerenalInfo, startTime });
    res.on('finish', () => {
        const executionTime = new Date().getTime() - startTime.getTime();
        logger.info({ ...gerenalInfo, executionTime: `${executionTime} ms` });
    });
    next();
});

app.use('/', authRouter);
app.use('/users', checkAuthToken, userRouter);
app.use('/groups', checkAuthToken, groupRouter);

app.get('/', (req, res) => {
    res.send('Hello World tttt!');
});

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.url} on this server!`, 404));
});

process
    .on('unhandledRejection', (reason, p) => {
        logger.warn({ reason, mess: 'Unhandled Rejection at Promise', promise: p });
    })
    .on('uncaughtException', err => {
        logger.error({ err, mess: 'Uncaught Exception thrown' });
    });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err : AppError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    logger.warn(formatMessForLogging(req, err.message, err.statusCode));

    res.status(err.statusCode).json({
        message: err.message
    });
});

app.listen(port, () => {
    logger.info(`Example app listening at http://localhost:${port}`);
});
