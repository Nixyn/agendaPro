(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('AgendaPRO')
        .component('sliderComicsSearch', {
            templateUrl:'/components/sliderComicsSearch/sliderComicsSearch.html',
            controller: sliderComicsSearchController,
            controllerAs: '$ctrl',
            bindings: {
                comics: '<',
                direction: '&',
                user: '='
            },
        });

    sliderComicsSearchController.$inject = [];
    function sliderComicsSearchController() {
        var $ctrl = this;
        
        $ctrl.arrowLeft = 'hidden';
        $ctrl.addComic = addComic;
        $ctrl.checkFavComics = checkFavComics;
        
        //////////////////////////////// MAIN FUNTIONS ////////////////////////////////

        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };

        function addComic(comic){
            checkFavComics();
            let isExistId = $ctrl.user.favComics.includes(comic); 
            if (!isExistId) {
                $ctrl.user.favComics.push(comic);
            }
        }

        function checkFavComics(item){
            checkExistFavComics();
            return $ctrl.user.favComics.includes(item);
        }
        //////////////////////////////// AUX FUNTIONS /////////////////////////////////

        function checkExistFavComics() {
            if (typeof $ctrl.user.favComics === "undefined") $ctrl.user.favComics = [];
        }
        
    }
})();