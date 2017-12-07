(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('AgendaPRO')
        .component('personalForm', {
            templateUrl: '/components/personalForm/personalForm.html',
            controller: personalFormController,
            controllerAs: '$ctrl',
            bindings: {
                newUser: '=',
                mainForm: '='
            },
        });
    personalFormController.$inject = [];
    function personalFormController() {
        var $ctrl = this;

        ////////////////

        $ctrl.$onInit = function () { };
        $ctrl.$onChanges = function (changesObj) { };
        $ctrl.$onDestroy = function () { };
    }
})();