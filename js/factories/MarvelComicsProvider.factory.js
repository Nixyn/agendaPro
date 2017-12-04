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
            let url = "https://gateway.marvel.com/v1/public/characters?nameStartsWith="+search.text+"&apikey=c0f0a669d3d9cb10bc99b228a2809f8f&hash=be02e436e63fbe4deb1f716e27230084";
            return $http.get(url)
                .then(comicsRecived)
                .catch(failRequest);
        }

        //////////////// AUX FUNTIONS
        
        function comicsRecived(response){
            console.log(response);
        }

        function failRequest(e){
            console.error("Error al cargar Marvel API compruebe su conexión a internet",e);
        }
    }
})();