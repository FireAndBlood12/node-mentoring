import IService from './IService';

export default interface IGroupService<T, K> extends IService<T, K> {
    checkExistingName(name: string) : Promise<boolean>,
    addUsersToGroup(groupId: number, userIds: Array<number>) : Promise<boolean>
};
