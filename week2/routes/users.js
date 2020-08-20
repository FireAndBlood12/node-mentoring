/* eslint-disable callback-return */
const express = require('express');
const userRouter = express.Router();
const UserModel = require('../models/users');
const validateSchema = require('../utils/validateSchema');
const userSchema = require('../schemas/user.schema');

function checkExisting(req, res, next) {
    if (!UserModel.checkExisting(Number(req.params.id))) res.status(404).json(`No user with such id: ${req.params.id}`);
    else next();
}

userRouter.get('/', (req, res) => {
    const limit = req.query.limit;
    const loginSubstring = req.query.loginSubstring;
    if (limit && loginSubstring) {
        return res.json(UserModel.getAutoSuggestUsers(loginSubstring, limit));
    }
    return res.json(UserModel.getAll());
});

userRouter.post('/', validateSchema(userSchema), (req, res) => {
    const createdUser = UserModel.createUser(req.body);
    return res.status(200).json(createdUser);
});

userRouter.get('/:id', checkExisting, (req, res) => {
    return res.status(200).json(UserModel.getById(Number(req.params.id)));
});

userRouter.put('/:id', checkExisting, validateSchema(userSchema), (req, res) => {
    return res.status(200).json(UserModel.updateUser(Number(req.params.id), req.body));
});

userRouter.delete('/:id', checkExisting, (req, res) => {
    return res.status(204).json(UserModel.deleteUser(Number(req.params.id)));
});

module.exports = userRouter;
