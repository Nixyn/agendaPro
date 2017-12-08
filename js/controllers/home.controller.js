(function () {
    'use strict';

    angular
        .module('AgendaPRO')
        .controller('HomeController', HomeController);

    HomeController.$inject = ["UsersLocalProvider", "GifsGiphyProvider", "MarvelComicsProvider"];
    function HomeController(UsersLocalProvider, GifsGiphyProvider, MarvelComicsProvider) {
        // Variables Declaration
        var vm = this;
        vm.users = [];
        vm.newUser = {};
        vm.isEditProcess = false;
        vm.gifs = [];
        vm.comics = [];
        vm.searchGifs = {};
        vm.searchComics = {};
        vm.searchComics.offset = 0;
        vm.view = 'datos';
        
        // Functions Declaration
        vm.addUser = addUser;
        vm.editUser = editUser;
        
        vm.loadUserToEdit = loadUserToEdit;
        vm.deleteUser = deleteUser;

        activate();

        //////////////// MAIN FUNCTIONS

        function activate() {
            vm.users = UsersLocalProvider.getUsers()
        }

        function addUser() {
            vm.newUser.id = createID();
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

            for (let i = 0; i < vm.users.length; i++) {
                const userID = vm.users[i].id;
                if (userID == idToEdit) vm.users[i] = vm.newUser;
            }
            UsersLocalProvider.editUser(vm.newUser);
            cleanFields();
        }

        function deleteUser(userToDelete) {
            let stringConfirm = prompt("Para borra el usuario se necesita escribir su nombre:   ");
            let idToDelete = userToDelete.id;

            if (stringConfirm == userToDelete.name) {
                for (let i = 0; i < vm.users.length; i++) {
                    const userID = vm.users[i].id;
                    if (userID == idToDelete) vm.users.splice(i, 1);
                }

                UsersLocalProvider.remove(userToDelete);
            }
        }
            
        
        //////////////// AUX FUNCTIONS
        
        function createID() {
            return Math.random().toString(36).substr(2, 10);
        }
        
        function cleanFields() {
            vm.newUser = {};
            vm.isEditProcess = false;
        }        
        
    }
})();