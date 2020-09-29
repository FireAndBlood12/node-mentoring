module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Groups', [{
            id: 1,
            name: 'root1',
            permissions: Sequelize.literal('ARRAY[\'READ\', \'WRITE\', \'DELETE\', \'SHARE\', \'UPLOAD_FILES\']::"enum_Groups_permissions"[]')
        }, {
            id: 2,
            name: 'test',
            permissions: Sequelize.literal('ARRAY[\'READ\', \'WRITE\', \'DELETE\']::"enum_Groups_permissions"[]')
        }, {
            id: 3,
            name: 'guests',
            permissions: Sequelize.literal('ARRAY[\'READ\']::"enum_Groups_permissions"[]')
        }, {
            id: 4,
            name: 'users',
            permissions: Sequelize.literal('ARRAY[\'READ\', \'WRITE\', \'SHARE\']::"enum_Groups_permissions"[]')
        }, {
            id: 5,
            name: 'vipUsers',
            permissions: Sequelize.literal('ARRAY[\'READ\', \'WRITE\', \'SHARE\', \'UPLOAD_FILES\']::"enum_Groups_permissions"[]')
        }, {
            id: 6,
            name: 'admins',
            permissions: Sequelize.literal('ARRAY[\'READ\', \'WRITE\', \'DELETE\', \'SHARE\', \'UPLOAD_FILES\']::"enum_Groups_permissions"[]')
        }, {
            id: 7,
            name: 'test2',
            permissions: Sequelize.literal('ARRAY[\'READ\', \'WRITE\', \'DELETE\', \'SHARE\', \'UPLOAD_FILES\']::"enum_Groups_permissions"[]')
        }]);
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('Groups', null, {});
    }
};
