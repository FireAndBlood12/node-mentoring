module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('users', [{
            login: 'login1',
            password: 'login25',
            age: 30,
            isDeleted: true
        }, {
            login: 'login4',
            password: 'login245',
            age: 20,
            isDeleted: false
        }, {
            login: 'login41',
            password: 'logindsa25',
            age: 28,
            isDeleted: false
        }, {
            login: 'login441',
            password: 'login2gfd5',
            age: 27,
            isDeleted: false
        }, {
            login: 'login331',
            password: 'login2gfd5',
            age: 29,
            isDeleted: true
        }, {
            login: 'login3451',
            password: 'login2gfd5',
            age: 20,
            isDeleted: true
        }, {
            login: 'login561',
            password: 'login2gfd5',
            age: 80,
            isDeleted: false
        }]);
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
