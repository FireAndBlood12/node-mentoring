import IService from './IService';

export default interface IUserService<T, K> extends IService<T, K> {
    getAutoSuggestUsers(loginSubstring: string, limit: number) :  Promise<T[]>,
    checkExistingLogin(login: string) : Promise<boolean>,
    getByLogin(login: string) :  Promise<T> | undefined,
};
