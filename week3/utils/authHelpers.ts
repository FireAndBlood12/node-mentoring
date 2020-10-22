/* eslint-disable callback-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { Request, Response, NextFunction } from 'express';
import { formatMessForLogging, logger } from '../utils/logger';

dotenv.config();

const generateToken = (userId: Number, refreshToken: Boolean) => {
    const tokenInfo = { id: userId };
    if (!refreshToken) {
        return jwt.sign(
            tokenInfo,
            process.env.TOCKEN_SECRET,
            { expiresIn: process.env.TOCKEN_LIFE }
        );
    }

    return jwt.sign(
        tokenInfo,
        process.env.REFRESH_TOCKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOCKEN_LIFE }
    );
};

const checkAuthToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        try {
            jwt.verify(token, process.env.TOCKEN_SECRET);
            next();
        } catch (error) {
            logger.info(formatMessForLogging(req, 'Forbidden Error', 403));
            return res.status(403).send('Forbidden Error');
        }
    } else {
        logger.info(formatMessForLogging(req, 'Unauthorized error', 401));
        return res.status(401).json('Unauthorized error');
    }
};

export default checkAuthToken;
export { generateToken, checkAuthToken };
