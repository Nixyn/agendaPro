(function() {
    'use strict';

    angular
        .module('AgendaPRO')
        .controller('HomeController', HomeController);

    HomeController.$inject = ["UsersLocalProvider"];
    function HomeController(UsersLocalProvider) {
        // Variables Declaration
        var vm = this;
        vm.users=[];
        vm.newUser = {};

        // Functions Declaration
        vm.addUser = addUser;

        activate();

        //////////////// MAIN FUNCTIONS

        function activate() { 
            vm.users = UsersLocalProvider.getUsers()
        }

        function addUser(){
            vm.newUser.id = createID();
            UsersLocalProvider.add(vm.newUser);
            vm.users.push(vm.newUser);
            cleanFields();
        }

        //////////////// AUX FUNCTIONS

        function createID() {   
            return Math.random().toString(36).substr(2, 10);
        }

        function cleanFields(){
            vm.newUser = {};
        }
    }
})();