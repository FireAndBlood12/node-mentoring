module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Users', [{
            id: 1,
            login: 'login1',
            password: 'login25',
            age: 30,
            isDeleted: true
        }, {
            id: 2,
            login: 'login4',
            password: 'login245',
            age: 20,
            isDeleted: false
        }, {
            id: 3,
            login: 'login41',
            password: 'logindsa25',
            age: 28,
            isDeleted: false
        }, {
            id: 4,
            login: 'login441',
            password: 'login2gfd5',
            age: 27,
            isDeleted: false
        }, {
            id: 5,
            login: 'login331',
            password: 'login2gfd5',
            age: 29,
            isDeleted: true
        }, {
            id: 6,
            login: 'login3451',
            password: 'login2gfd5',
            age: 20,
            isDeleted: true
        }, {
            id: 7,
            login: 'login561',
            password: 'login2gfd5',
            age: 80,
            isDeleted: false
        }]);
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
