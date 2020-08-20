const users = [];
let nextUserId = 1;
const UserModel = {};

UserModel.getById = (id) => users.find(user => user.id === id && !user.isDeleted);

UserModel.getAll = () => users.filter(user => !user.isDeleted);

UserModel.getAutoSuggestUsers = (loginSubstring, limit) => {
    const allUsers = UserModel.getAll();
    if (loginSubstring && limit) {
        return allUsers.filter(user => user.login.includes(loginSubstring)).slice(0, limit);
    }
    if (loginSubstring) {
        return allUsers.filter(user => user.login.includes(loginSubstring));
    }
    if (limit) {
        return allUsers.slice(0, limit);
    }
    return allUsers;
};

UserModel.createUser = (userData) => {
    const user = { ...userData, id: nextUserId++, isDeleted: false };
    users.push(user);
    return { ...user };
};

UserModel.updateUser = (id, updatedUserData) => {
    const position = users.findIndex(user => user.id === id);
    if (position !== -1) {
        users[position] = { ...users[position], ...updatedUserData };
        return users[position];
    }
};

UserModel.deleteUser = (id) => {
    const user = UserModel.getById(id);
    user.isDeleted = true;
};

UserModel.checkExisting = (id) => !!users.find(user => user.id === id && !user.isDeleted);

Object.freeze(UserModel);

module.exports = UserModel;
