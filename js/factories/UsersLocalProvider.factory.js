(function() {
    'use strict';

    angular
        .module('AgendaPRO')
        .factory('UsersLocalProvider', UsersLocalProvider);

    UsersLocalProvider.$inject = [];
    function UsersLocalProvider() {
        var service = {
            getUsers:getUsers,
            add:add,
            remove:remove,
            editUser:editUser
        };
        
        return service;

        ////////////////
        
        function getUsers(){
            if("users" in localStorage){
                let users = JSON.parse(localStorage.getItem("users"));
                return users;
            } 
            else {
                return localStorage.setItem("users",JSON.stringify([]));;
            }
        }

        function add(user) {
            let users = JSON.parse(localStorage.getItem("users"));
            users.push(user); 
            localStorage.setItem("users",JSON.stringify(users));
        }

        function remove(user){                     
            let users = JSON.parse(localStorage.getItem("users"));
            let idToDelete = user.id;
            for (let i = 0; i < users.length; i++) {
                const userID = users[i].id;
                if(userID==idToDelete) users.splice(i,1);
            }
            localStorage.setItem("users",JSON.stringify(users));
        }

        function editUser(user){
            let users = JSON.parse(localStorage.getItem("users"));
            let idToEdit = user.id;
            
            for (let i = 0; i < users.length; i++) {
                const userID = users[i].id;
                if(userID==idToEdit) users[i]= user;
            }
            localStorage.setItem("users",JSON.stringify(users));
        }
    }
})();