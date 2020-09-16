module.exports = {
    up(queryInterface, Sequelize) {
        return  queryInterface.createTable(
            'Groups',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },
                permissions: {
                    type: Sequelize.ARRAY(
                        Sequelize.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')
                    ),
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
        return queryInterface.dropTable('Groups');
    }
};
