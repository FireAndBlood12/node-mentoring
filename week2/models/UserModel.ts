import IUserModel from './interfaces/IUserModel';
import IUser from '../entities/IUser';
import IUserGenericData from '../entities/IUserGenericData';

class UserModelRAM implements IUserModel<IUser, IUserGenericData> {
    users: IUser[];
    nextUserId: number;
    private static instance: UserModelRAM;

    private constructor() {
        this.users = [];
        this.nextUserId = 1;
    }

    checkExistingLogin(login: string): boolean {
        return !!this.users.find((user) => user.login === login);
    }

    static getInstance(): UserModelRAM {
        if (!UserModelRAM.instance) {
            UserModelRAM.instance = new UserModelRAM();
        }
        return UserModelRAM.instance;
    }

    getAutoSuggestUsers(loginSubstring: string, limit: number): IUser[] {
        const allUsers = this.getAll();
        if (loginSubstring && limit) {
            return allUsers.filter((user) => user.login.includes(loginSubstring)).slice(0, limit);
        }
        if (loginSubstring) {
            return allUsers.filter((user) => user.login.includes(loginSubstring));
        }
        if (limit) {
            return allUsers.slice(0, limit);
        }
        return allUsers;
    }

    getAll(): IUser[] {
        return this.users.filter((user) => !user.isDeleted);
    }

    getById(id: string): IUser {
        return this.users.find((user) => user.id === id && !user.isDeleted);
    }

    create(data: IUserGenericData): IUser {
        const user: IUser = { ...data, id: `${this.nextUserId++}`, isDeleted: false };
        this.users.push(user);
        return { ...user };
    }

    update(id: string, updatedData: IUserGenericData): IUser {
        const position = this.users.findIndex((user) => user.id === id);
        if (position !== -1) {
            this.users[position] = { ...this.users[position], ...updatedData };
            return this.users[position];
        }
    }

    delete(id: string): IUser {
        const user = this.getById(id);
        user.isDeleted = true;
        return user;
    }

    checkExisting(id: string): boolean {
        return !!this.users.find((user) => user.id === id && !user.isDeleted);
    }
}

export default UserModelRAM;
