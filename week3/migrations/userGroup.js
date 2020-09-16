module.exports = {
    up(queryInterface, Sequelize) {
        return  queryInterface.createTable(
            'UserGroups',
            {
                UserId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'Users',
                        key: 'id'
                    },
                    primaryKey: true,
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                    allowNull: false
                },
                GroupId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'Groups',
                        key: 'id'
                    },
                    primaryKey: true,
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                    allowNull: false
                }
            },
            {
                engine: 'INNODB',
                charset: 'latin1',
                schema: 'public'
            }
        );
    },

    down(queryInterface) {
        return queryInterface.dropTable('UserGroups');
    }
};
