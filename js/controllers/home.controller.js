(function () {
    'use strict';

    angular
        .module('AgendaPRO')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UsersLocalProvider','$firebaseObject'];
    function HomeController(UsersLocalProvider,$firebaseObject) {

         /* __________________________: Variables Declaration :_________________________ */
        var vm = this;
        vm.users = [];
        vm.newUser = {};
        vm.isEditProcess = false;
        vm.view = 'datos';
        
        /* __________________________: Functions Declaration :_________________________ */
        vm.addUser = addUser;
        vm.editUser = editUser;
        vm.loadUserToEdit = loadUserToEdit;
        vm.deleteUser = deleteUser;

        activate();

        //////////////////////////////// MAIN FUNTIONS ////////////////////////////////

        function activate() {
            vm.users = UsersLocalProvider.getUsers()
        }

        function addUser() {
            vm.newUser.id = UsersLocalProvider.createID();
            UsersLocalProvider.add(vm.newUser);
            vm.users.push(vm.newUser);
            cleanFields();
        }

        function loadUserToEdit(userToEdit) {
            vm.newUser = Object.assign({}, userToEdit);
            vm.isEditProcess = true;
        }

        function editUser() {
            let idToEdit = vm.newUser.id;
            let index = vm.users.findIndex(user => user.id === idToEdit);
            
            UsersLocalProvider.editUser(vm.newUser);
            vm.users[index] = vm.newUser;
            cleanFields();
        }

        function deleteUser(userToDelete) {
            let stringConfirm = prompt('Para borra el usuario se necesita escribir su nombre:   ');
            let idToDelete = userToDelete.id;

            if (stringConfirm == userToDelete.name) {
                let index = vm.users.findIndex(user => user.id === idToDelete );

                UsersLocalProvider.remove(userToDelete);
                vm.users.splice(i, 1);
            }
        }
                 
        //////////////////////////////// AUX FUNTIONS /////////////////////////////////
        
        function cleanFields() {
            vm.newUser = {};
            vm.isEditProcess = false;
        }        
        
    }
})();