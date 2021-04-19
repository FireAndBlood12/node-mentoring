import express from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import UserService from '../services/UserService';
import authSchema from '../schemas/auth.schema';
import validateSchema from '../utils/validateSchema';
import { logger, formatMessForLogging } from '../utils/logger';
import { generateToken } from '../utils/authHelpers';

const userService = new UserService(UserModel);
const authRouter = express.Router();


authRouter.post('/login', validateSchema(authSchema), async (req, res) => {
    const user = await userService.getByLogin(req.body.login);
    if (!user || user.password !== req.body.password) {
        logger.info(formatMessForLogging(req, 'Incorrect login or password', 401));
        return res.status(401).json('Incorrect login or password');
    }
    res.status(200).json({
        token: generateToken(user.id, false),
        refreshToken: generateToken(user.id, true)
    });
});

authRouter.post('/token', async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        logger.info(formatMessForLogging(req, 'Invalid refresh token', 404));
        res.status(404).send('Invalid refresh token');
    }
    try {
        const decodedData = jwt.verify(refreshToken, process.env.REFRESH_TOCKEN_SECRET) as { id: number };
        res.status(200).json({
            token: generateToken(Number(decodedData.id), false),
            refreshToken
        });
    } catch (error) {
        logger.info(formatMessForLogging(req, 'Invalid refresh token', 404));
        res.status(404).send('Invalid refresh token');
    }
});

export default authRouter;
