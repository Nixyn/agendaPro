(function () {
    'use strict';
    angular.module("AgendaPRO", ["ngRoute"])
        .config(config);

    config.$inject = ["$routeProvider"];
    function config($routeProvider) {
        $routeProvider
        .when("/", {
            controller: "HomeController",
            templateUrl: "/views/home.html",
            controllerAs: "homeCtrl"
        });
    }

})();