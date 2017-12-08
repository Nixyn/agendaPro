(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('AgendaPRO')
        .component('userCard', {
            templateUrl: '/components/userCard/userCard.html',
            controller: userCardController,
            controllerAs: '$ctrl',
            bindings: {
                user: '=',
                edit: '&',
                delete: '&'
            },
        });

    userCardController.$inject = [];
    function userCardController() {
        var $ctrl = this;

        ////////////////

        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };
    }
})();