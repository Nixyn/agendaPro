(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('AgendaPRO')
        .component('sliderGifsSearch', {
            templateUrl: '/components/sliderGifsSearch/sliderGifsSearch.html',
            controller: sliderGifsSearchController,
            controllerAs: '$ctrl',
            bindings: {
                gifs: '<',
                direction: '&',
                user: '='
            },
        });

    sliderGifsSearchController.$inject = [];
    function sliderGifsSearchController() {
        var $ctrl = this;
        
        $ctrl.addGif = addGif;
        $ctrl.checkFavGifs = checkFavGifs;

        //////////////////////////////// MAIN FUNTIONS ////////////////////////////////

        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };

        function addGif(gif) {
            checkExistFavGifs();
            let isExistId = $ctrl.user.favGifs.includes(gif); 
            if (!isExistId) {
                $ctrl.user.favGifs.push(gif);
            }
        }

        function checkFavGifs(item){ /* Mejorar naming de esto */
            checkExistFavGifs();            
            return $ctrl.user.favGifs.includes(item);
        }

        //////////////////////////////// AUX FUNTIONS /////////////////////////////////

        function checkExistFavGifs() {
            if (typeof $ctrl.user.favGifs === "undefined") $ctrl.user.favGifs = [];
        }
    }
})();