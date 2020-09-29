/* eslint-disable callback-return */
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/UserModel';
import UserService from '../services/UserService';
import validateSchema from '../utils/validateSchema';
import userSchema from '../schemas/user.schema';
import IUserResponse from '../entities/IUserResponse';

const userService = new UserService(UserModel);
const userRouter = express.Router();

async function checkExisting(req: Request, res: Response, next: NextFunction) {
    if (!(await userService.checkExisting(Number(req.params.id)))) {
        res.status(404).json(`No user with such id: '${req.params.id}'!`);
    } else next();
}

function formatResDataObj(responseData: any) : IUserResponse | undefined {
    if (responseData) {
        return { id: responseData.id, login: responseData.login, age: responseData.age };
    }
}

function formatResDataArr(responseData: any) : IUserResponse[]  {
    if (responseData) {
        return responseData.map(formatResDataObj);
    }
}


userRouter.get('/', async (req, res) => {
    const limit : number = Number(req.query.limit);
    const loginSubstring : string = req.query.loginSubstring && String(req.query.loginSubstring);
    if (limit || loginSubstring) {
        const users = await userService.getAutoSuggestUsers(loginSubstring, limit);
        return res.json(formatResDataArr(users));
    }
    return res.json(formatResDataArr(await userService.getAll()));
});

userRouter.post('/', validateSchema(userSchema), async (req, res) => {
    if (await userService.checkExistingLogin(req.body.login)) {
        return res.status(400).json(`User with such login: '${req.body.login}' already exists!`);
    }
    const createdUser = await userService.create(req.body);
    return res.status(200).json(formatResDataObj(createdUser));
});

userRouter.get('/:id', checkExisting, async (req, res) => {
    const user = await userService.getById(Number(req.params.id));
    return res.status(200).json(formatResDataObj(user));
});

userRouter.put('/:id', checkExisting, validateSchema(userSchema), async (req, res) => {
    const user = await userService.getById(Number(req.params.id));
    if (user.login !== req.body.login) {
        if (await userService.checkExistingLogin(req.body.login)) {
            return res.status(400).json(`User with such login: '${req.body.login}' already exists!`);
        }
    }
    const updatedUser = await userService.update(Number(req.params.id), req.body);
    return res.status(200).json(formatResDataObj(updatedUser));
});

userRouter.delete('/:id', checkExisting, async (req, res) => {
    if (await userService.delete(Number(req.params.id))) {
        return res.status(204).json();
    }
    return res.status(500);
});

export default userRouter;
