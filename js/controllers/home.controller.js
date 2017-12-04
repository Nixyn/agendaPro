(function() {
    'use strict';

    angular
        .module('AgendaPRO')
        .controller('HomeController', HomeController);

    HomeController.$inject = [];
    function HomeController() {
        // Variables Declaration
        var vm = this;
        vm.users=[
            {
                id: "s58k9qgzqe",
                photo: "",
                name: "pedro",
                phone: "656656565"
            }
        ];
        vm.newUser = {};

        // Functions Declaration
        vm.addUser = addUser;

        activate();

        //////////////// MAIN FUNCTIONS

        function activate() { }

        function addUser(){
            vm.newUser.id = createID();
            vm.users.push(vm.newUser);
            cleanFields()
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