(function () {
    'use strict';

    angular
        .module('AgendaPRO')
        .factory('UsersLocalProvider', UsersLocalProvider);

    UsersLocalProvider.$inject = [];
    function UsersLocalProvider() {
        
        /* __________________________: Functions Declaration :_________________________ */
        var service = {
            getUsers: getUsers,
            add: add,
            remove: remove,
            editUser: editUser,
            get: get,
            createID:createID
        };

        return service;

        //////////////////////////////// MAIN FUNTIONS ////////////////////////////////

        function getUsers() {
            if ("users" in localStorage) {
                let users = JSON.parse(localStorage.getItem("users"));
                return users;
            }
            else {
                localStorage.setItem("users", JSON.stringify([]));;
                return [];
            }
        }

        function add(user) {
            let users = JSON.parse(localStorage.getItem("users"));
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
        }

        function remove(user) {
            let users = JSON.parse(localStorage.getItem("users"));
            let idToDelete = user.id;
            let index = users.findIndex(user => { return user.id === idToDelete });

            users.splice(index, 1);
            localStorage.setItem("users", JSON.stringify(users));
        }

        function editUser(user) {
            let users = JSON.parse(localStorage.getItem("users"));
            let idToEdit = user.id;
            let index = users.findIndex(user => { return user.id === idToEdit });

            users[index] = user;
            localStorage.setItem("users", JSON.stringify(users));
        }

        function get(userId) {
            let users = JSON.parse(localStorage.getItem("users"));
            let index = users.findIndex(user => { return user.id === userId });

            return users[index];
        }

        function createID() {
            return Math.random().toString(36).substr(2, 10);
        }
    }
})();