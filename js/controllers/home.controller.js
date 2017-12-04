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
        vm.isEditProcess = false;

        // Functions Declaration
        vm.addUser = addUser;
        vm.loadUserToEdit = loadUserToEdit;
        vm.editUser = editUser;

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

        function loadUserToEdit(userToEdit){
            vm.newUser = Object.assign({}, userToEdit);
            vm.isEditProcess = true;
        }

        function editUser(){
            let idToEdit = vm.newUser.id;
            
            for (let i = 0; i < vm.users.length; i++) {
                const userID = vm.users[i].id;
                if(userID==idToEdit) vm.users[i]= vm.newUser;
            }
            UsersLocalProvider.editUser(vm.newUser);
            cleanFields();
        }

        //////////////// AUX FUNCTIONS

        function createID() {   
            return Math.random().toString(36).substr(2, 10);
        }

        function cleanFields(){
            vm.newUser = {};
            vm.isEditProcess = false;
        }
    }
})();