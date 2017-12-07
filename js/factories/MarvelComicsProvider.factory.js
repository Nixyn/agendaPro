(function () {
    'use strict';

    angular
        .module('AgendaPRO')
        .factory('MarvelComicsProvider', MarvelComicsProvider);

    MarvelComicsProvider.$inject = ['$http'];
    function MarvelComicsProvider($http) {
        let vm = this;
        vm.offset = 3;
        vm.offsetCount = 0;
        vm.limit = 3;
        vm.apiKey = "c0f0a669d3d9cb10bc99b228a2809f8f";
        vm.hash = "be02e436e63fbe4deb1f716e27230084";

        let service = {
            getSearch: getSearch,
        };

        return service;

        //////////////// MAIN FUNTIONS
        
        function getSearch(search) {
            
            let url = "https://gateway.marvel.com/v1/public/comics?ts=1&titleStartsWith=" + search.text + "&limit=" + vm.limit + "&offset=" + search.offset + "&apikey=" + vm.apiKey + "&hash=" + vm.hash;
            return $http.get(url)
                .then(comicsRecived)
                .catch(failRequest);
        }

        //////////////// AUX FUNTIONS
        
        function comicsRecived(response) {
            let arrayComics = [];
            let data = response.data.data.results;
            vm.offsetCount += vm.offset;

            console.log(data);
            for (let i = 0; i < data.length; i++) {
                if(data[i].thumbnail.path.indexOf("not_")){
                    
                }

                let comic = {};
                comic.id = data[i].id;
                comic.name = data[i].name;
                comic.photo = data[i].thumbnail.path + "." + data[i].thumbnail.extension;
                arrayComics.push(comic);
            }
            
            return arrayComics;
        } 

        function failRequest(e) {
            console.error("Error al cargar Marvel API compruebe su conexión a internet", e);
        }
    }
})();