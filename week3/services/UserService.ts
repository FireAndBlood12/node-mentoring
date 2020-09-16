import { Op } from 'sequelize';
import IUserService from './interfaces/IUserService';
import IUserGenericData from '../entities/IUserGenericData';
import User from '../models/UserModel';

export default class UserService implements IUserService<User, IUserGenericData> {
    userModel: any;

    constructor(userModel: any) {
        this.userModel = userModel;
    }

    async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<User[]> {
        if (loginSubstring && loginSubstring.length && limit) {
            console.log('here');
            return await this.userModel.findAll({
                where: {
                    login: { [Op.substring]: loginSubstring },
                    isDeleted: false
                },
                limit
            });
        }
        if (loginSubstring && loginSubstring.length) {
            return await this.userModel.findAll({
                where: {
                    login: { [Op.substring]: loginSubstring },
                    isDeleted: false
                }
            });
        }
        if (limit) {
            return await this.userModel.findAll({ where: { isDeleted: false }, limit });
        }
        return await this.userModel.findAll({ where: { isDeleted: false } });
    }
    async checkExistingLogin(login: string): Promise<boolean> {
        const res =  await this.userModel.findAll({ where: { login } });
        return !!res.length;
    }
    async getAll(): Promise<User[]> {
        return await this.userModel.findAll({ where: { isDeleted: false } });
    }
    async getById(id: number): Promise<User> {
        return await this.userModel.findByPk(id);
    }
    async create(data: IUserGenericData): Promise<User> {
        return await this.userModel.create(data);
    }
    async update(id: number, data: IUserGenericData): Promise<User> {
        await this.userModel.update(data, { where: { id } });
        return await this.getById(id);
    }
    async delete(id: number): Promise<boolean> {
        const result =  await this.userModel.update({ isDeleted: true }, { where: { id } });
        return !!result[0];
    }
    async checkExisting(id: number): Promise<boolean> {
        const res =  await this.userModel.findAll({ where: { id, isDeleted: false } });
        return !!res.length;
    }
}
