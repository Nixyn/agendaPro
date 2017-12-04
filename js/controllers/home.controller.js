(function() {
    'use strict';

    angular
        .module('AgendaPRO')
        .controller('HomeController', HomeController);

    HomeController.$inject = [];
    function HomeController() {
        var vm = this;
        vm.users=[
            {
                id: "su madre",
                photo: "",
                name: "pedro",
                phone: "656656565"
            }
        ];

        activate();

        ////////////////

        function activate() { }
    }
})();