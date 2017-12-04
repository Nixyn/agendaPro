(function () {
    'use strict';

    angular
        .module('AgendaPRO')
        .factory('MarvelComicsProvider', MarvelComicsProvider);

    MarvelComicsProvider.$inject = ['$http'];
    function MarvelComicsProvider($http) {
        var service = {
            getSearch: getSearch
        };

        return service;

        //////////////// MAIN FUNTIONS
        function getSearch(search) {
            let apiKey = "apikey=c0f0a669d3d9cb10bc99b228a2809f8f";
            let hash = "hash=be02e436e63fbe4deb1f716e27230084";
            let url = "https://gateway.marvel.com/v1/public/comics?ts=1&titleStartsWith=" + search.text + "&" + apiKey + "&" + hash;
            return $http.get(url)
                .then(comicsRecived)
                .catch(failRequest);
        }

        //////////////// AUX FUNTIONS

        function comicsRecived(response) {
            let arrayComics = [];
            let data = response.data.data.results;
            for (let i = 0; i < data.length; i++) {
                let comic = {};
                comic.id = data[i].id;
                comic.name = data[i].name;
                comic.photo = data[i].thumbnail.path + "/portrait_incredible.jpg";
                arrayComics.push(comic);
            }
            return arrayComics;
        }

        function failRequest(e) {
            console.error("Error al cargar Marvel API compruebe su conexión a internet", e);
        }
    }
})();