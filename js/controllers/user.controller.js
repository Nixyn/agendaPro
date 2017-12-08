(function () {
    'use strict';

    angular
        .module('AgendaPRO')
        .controller('UserController', UserController);

    UserController.$inject = ['$routeParams', 'UsersLocalProvider'];
    function UserController($routeParams, UsersLocalProvider) {
        var vm = this;
        vm.user = {};

        activate();

        //////////////////////////////// MAIN FUNTIONS ////////////////////////////////

        function activate() {
            loadUser();
        }

        function loadUser() {
            let userId = $routeParams.id;
            vm.user = UsersLocalProvider.get(userId);
        }
    }
})();