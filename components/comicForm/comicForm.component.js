(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('AgendaPRO')
        .component('comicForm', {
            templateUrl: '/components/comicForm/comicForm.html',
            controller: comicFormController,
            controllerAs: '$ctrl',
            bindings: {
                user: '='
            },
        });

    comicFormController.$inject = ['MarvelComicsProvider'];
    function comicFormController(MarvelComicsProvider) {
        var $ctrl = this;
        
        $ctrl.removeComic = removeComic
        $ctrl.setComicSearchDirection = setComicSearchDirection
        $ctrl.loadComicsSearch = loadComicsSearch

        //////////////////////////////// MAIN FUNTIONS ////////////////////////////////

        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };

        function removeComic(comic) {
            for (let i = 0; i < $ctrl.user.favComics.length; i++) {
                const userID = $ctrl.user.favComics[i].id;
                if (userID == comic.id) $ctrl.user.favComics.splice(i, 1);
            }
        }
                
        function setComicSearchDirection(direction) {
            $ctrl.searchComics.direction = direction;
            console.log($ctrl.searchComics)
            loadComicsSearch($ctrl.searchComics);
        }

        function loadComicsSearch(search) {
            MarvelComicsProvider.getSearch(search).then(response => $ctrl.comics = response);    
        }
    }
})();