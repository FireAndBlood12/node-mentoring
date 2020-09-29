module.exports = {
    up(queryInterface, Sequelize) {
        return  queryInterface.createTable(
            'Users',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                login: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                age: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    validate: {
                        min: 4,
                        max: 130
                    }
                },
                isDeleted: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                    allowNull: false
                }
            },
            {
                engine: 'INNODB',                     // default: 'InnoDB'
                charset: 'latin1',                    // default: null
                schema: 'public'                      // default: public, PostgreSQL only.
            }
        );
    },

    down(queryInterface) {
        return queryInterface.dropTable('Users');
    }
};
