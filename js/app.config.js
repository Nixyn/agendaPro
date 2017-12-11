(function () {
    'use strict';
    angular.module("AgendaPRO", ["ngRoute","firebase"])
        .config(config);

    config.$inject = ["$routeProvider"];
    function config($routeProvider) {
        $routeProvider
        .when("/", {
            controller: "HomeController",
            templateUrl: "/views/home.html",
            controllerAs: "homeCtrl"
        })
        .when("/user/:id", {
            controller: "UserController",
            templateUrl: "/views/user.html",
            controllerAs: "userCtrl",
            resolve: {
                user: loadFirstUser
            }
        })
    }

})();

loadFirstUser.$inject = ["$route","UsersLocalProvider"];
function loadFirstUser($route,UsersLocalProvider){
    return UsersLocalProvider.get($route.current.params.id);
}