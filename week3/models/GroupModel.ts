import { DataTypes, Model } from 'sequelize';
import sequelize from '../data-access';
import IGroup from '../entities/IGroup';

class Group extends Model<IGroup, any> {
    name: any;
}

Group.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    permissions: {
        type: DataTypes.ARRAY(
            DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')
        ),
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    tableName: 'Groups',
    modelName: 'Group'
});

export default Group;
