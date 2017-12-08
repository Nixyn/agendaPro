(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('AgendaPRO')
        .component('gifForm', {
            templateUrl: '/components/gifForm/gifForm.html',
            controller: gifFormController,
            controllerAs: '$ctrl',
            bindings: {
                user: '='
            },
        });

    gifFormController.$inject = ['GifsGiphyProvider'];
    function gifFormController(GifsGiphyProvider) {
        var $ctrl = this;

        $ctrl.loadGifsSearch = loadGifsSearch;
        $ctrl.removeGif = removeGif;
        $ctrl.setGifSearchDirection = setGifSearchDirection; 

        //////////////////////////////// MAIN FUNTIONS ////////////////////////////////

        $ctrl.$onInit = function () { };
        $ctrl.$onChanges = function (changesObj) { };
        $ctrl.$onDestroy = function () { };

        function loadGifsSearch(search) {
            GifsGiphyProvider.getSearch(search).then(response => $ctrl.gifs = response);
        }

        function removeGif(gif) {
            for (let i = 0; i < $ctrl.user.favGifs.length; i++) {
                const userID = $ctrl.user.favGifs[i].id;
                if (userID == gif.id) $ctrl.user.favGifs.splice(i, 1);
            }
        }

        function setGifSearchDirection(direction) {
            $ctrl.searchGifs.direction = direction;
            loadGifsSearch($ctrl.searchGifs);
        }
    }
})();