import { Model } from 'sequelize';
import sequelize from '../data-access';
import User from './UserModel';
import Group from './GroupModel';

class UserGroup extends Model {
}

UserGroup.init({
}, {
    sequelize,
    timestamps: false,
    tableName: 'UserGroups',
    modelName: 'UserGroup'
});

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

export default UserGroup;
