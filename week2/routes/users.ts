import express from 'express';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/UserModel';
import validateSchema from '../utils/validateSchema';
import userSchema from '../schemas/user.schema';
import IUser from '../entities/IUser';
import IUserResponse from '../entities/IUserResponse';

const userModel = UserModel.getInstance();
const userRouter = express.Router();

function checkExisting(req: Request, res: Response, next: NextFunction) {
    if (!userModel.checkExisting(req.params.id)) res.status(404).json(`No user with such id: '${req.params.id}'!`);
    else next();
}

function formatResDataObj(responseData: IUser) : IUserResponse | undefined {
    if (responseData) {
        return { id: responseData.id, login: responseData.login, age: responseData.age };
    }
}

function formatResDataArr(responseData: IUser[]) : IUserResponse[]  {
    if (responseData) {
        return responseData.map(formatResDataObj);
    }
}


userRouter.get('/', (req, res) => {
    const limit : number = Number(req.query.limit);
    const loginSubstring : string = String(req.query.loginSubstring);
    if (limit && loginSubstring) {
        return res.json(formatResDataArr(userModel.getAutoSuggestUsers(loginSubstring, limit)));
    }
    return res.json(formatResDataArr(userModel.getAll()));
});

userRouter.post('/', validateSchema(userSchema), (req, res) => {
    if (userModel.checkExistingLogin(req.body.login)) {
        return res.status(400).json(`User with such login: '${req.body.login}' already exists!`);
    }
    const createdUser = userModel.create(req.body);
    return res.status(200).json(formatResDataObj(createdUser));
});

userRouter.get('/:id', checkExisting, (req, res) => {
    return res.status(200).json(formatResDataObj(userModel.getById(req.params.id)));
});

userRouter.put('/:id', checkExisting, validateSchema(userSchema), (req, res) => {
    return res.status(200).json(formatResDataObj(userModel.update(req.params.id, req.body)));
});

userRouter.delete('/:id', checkExisting, (req, res) => {
    return res.status(204).json(formatResDataObj(userModel.delete(req.params.id)));
});

export default userRouter;
