import IModel from './IModel';

export default interface IUserModel<T, K> extends IModel<T, K> {
    getAutoSuggestUsers(loginSubstring: string, limit: number) : T[],
    checkExistingLogin(login: string) : boolean
}