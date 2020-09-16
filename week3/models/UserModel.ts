import { DataTypes, Model } from 'sequelize';
import sequelize from '../data-access';
import IUser from '../entities/IUser';

class User extends Model<IUser, any> {
    login: any;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 4,
            max: 130
        }
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'Users',
    modelName: 'User'
});

export default User;
