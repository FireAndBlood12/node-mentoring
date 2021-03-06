/* eslint-disable callback-return */
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import GroupModel from '../models/GroupModel';
import UserGroupModel from '../models/UserGroupModel';
import UserModel from '../models/UserModel';
import UserService from '../services/UserService';
import GroupService from '../services/GroupService';
import validateSchema from '../utils/validateSchema';
import GroupSchema from '../schemas/Group.schema';

const groupService = new GroupService(GroupModel, UserGroupModel);
const userService = new UserService(UserModel);
const groupRouter = express.Router();

async function checkExisting(req: Request, res: Response, next: NextFunction) {
    const isExisting = await groupService.checkExisting(Number(req.params.id));
    if (!isExisting) {
        res.status(404).json(`No Group with such id: '${req.params.id}'!`);
    } else next();
}

async function checkExistingUsers(req: Request, res: Response, next: NextFunction) {
    const userIds: number[] = req.body;
    for (const UserId of userIds) {
        if (!(await userService.checkExisting(UserId))) {
            return res.status(404).json(`No user with such id: '${UserId}'!`);
        };
    }
    next();
}

groupRouter.get('/', async (req, res) => {
    return res.json(await groupService.getAll());
});

groupRouter.post('/', validateSchema(GroupSchema), async (req, res) => {
    if (await groupService.checkExistingName(req.body.name)) {
        return res.status(400).json(`Group with such name: '${req.body.name}' already exists!`);
    }
    const createdGroup = await groupService.create(req.body);
    return res.status(200).json(createdGroup);
});

groupRouter.get('/:id', checkExisting, async (req, res) => {
    const group = await groupService.getById(Number(req.params.id));
    return res.status(200).json(group);
});

groupRouter.put('/:id', checkExisting, validateSchema(GroupSchema), async (req, res) => {
    const group = await groupService.getById(Number(req.params.id));
    if (group.name !== req.body.name) {
        if (await groupService.checkExistingName(req.body.name)) {
            return res.status(400).json(`Group with such name: '${req.body.name}' already exists!`);
        }
    }
    const updatedGroup = await groupService.update(Number(req.params.id), req.body);
    return res.status(200).json(updatedGroup);
});

groupRouter.delete('/:id', checkExisting, async (req, res) => {
    await groupService.delete(Number(req.params.id));
    return res.status(204);
});

groupRouter.post('/addUsers/:id', checkExisting, checkExistingUsers, async (req, res) => {
    if (await groupService.addUsersToGroup(Number(req.params.id), req.body)) {
        return res.status(200).json('Users were added to group!');
    }
    return res.status(400).json('Users have already added to group!');
});

export default groupRouter;
