import IGroupGenericData from '../entities/IGroupGenericData';
import Group from '../models/GroupModel';
import IGroupService from './interfaces/IGroupService';
import sequelize from '../data-access';


export default class GroupService implements IGroupService<Group, IGroupGenericData> {
    groupModel: any;
    userGroupModel: any;

    constructor(groupModel: any, userGroupModel: any) {
        this.groupModel = groupModel;
        this.userGroupModel = userGroupModel;
    }
    async addUsersToGroup(GroupId: number, userIds: number[]): Promise<boolean> {
        const addingTransaction = await sequelize.transaction();

        try {
            for (const UserId of userIds) {
                await this.userGroupModel.create(
                    { GroupId, UserId },
                    { transaction: addingTransaction }
                );
            }
            await addingTransaction.commit();
        } catch (error) {
            await addingTransaction.rollback();
            return false;
        }
        return true;
    }

    async checkExistingName(name: string): Promise<boolean> {
        const res =  await this.groupModel.findAll({ where: { name } });
        return !!res.length;
    }

    async getAll(): Promise<Group[]> {
        return await this.groupModel.findAll();
    }

    async getById(id: number): Promise<Group> {
        return await this.groupModel.findByPk(id);
    }

    async create(data: IGroupGenericData): Promise<Group> {
        return await this.groupModel.create(data);
    }
    async update(id: number, data: IGroupGenericData): Promise<Group> {
        await this.groupModel.update(data, { where: { id } });
        return await this.getById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result =  await this.groupModel.destroy({ where: { id } });
        return !!result[0];
    }

    async checkExisting(id: number): Promise<boolean> {
        const res =  await this.groupModel.findAll({ where: { id } });
        return !!res.length;
    }
}
