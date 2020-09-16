module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert('UserGroups', [{
            UserId: 1,
            GroupId: 1
        }, {
            UserId: 2,
            GroupId: 1
        }, {
            UserId: 3,
            GroupId: 1
        }, {
            UserId: 1,
            GroupId: 2
        }, {
            UserId: 1,
            GroupId: 3
        }, {
            UserId: 2,
            GroupId: 2
        }, {
            UserId: 3,
            GroupId: 3
        }]);
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('UserGroups', null, {});
    }
};
