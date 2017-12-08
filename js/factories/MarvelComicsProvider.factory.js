(function () {
    'use strict';

    angular
        .module('AgendaPRO')
        .factory('MarvelComicsProvider', MarvelComicsProvider);

    MarvelComicsProvider.$inject = ['$http'];
    function MarvelComicsProvider($http) {
        let vm = this;
        vm.search = {
            offsetCount: 0,
            offset: 3,
            limit: 3,
            increaserOffset: function () {
                this.offsetCount += this.offset;
            },
            decreaserOffset: function () {
                if (this.offsetCount > 0) this.offsetCount -= this.offset;
            },
            selectVariation: function (direction) {
                if (direction == "right") this.increaserOffset();
                else if (direction == "left") this.decreaserOffset();
            }

        }
        vm.apiKey = "c0f0a669d3d9cb10bc99b228a2809f8f";
        vm.hash = "be02e436e63fbe4deb1f716e27230084";

        let service = {
            getSearch: getSearch,
        };

        return service;

        //////////////////////////////// MAIN FUNTIONS ////////////////////////////////

        function getSearch(search) {
            console.log(search.direction)
            vm.search.selectVariation(search.direction);
            let url = "https://gateway.marvel.com/v1/public/comics?ts=1&titleStartsWith=" + search.text + "&limit=" + vm.search.limit + "&offset=" + vm.search.offsetCount + "&apikey=" + vm.apiKey + "&hash=" + vm.hash;
            return $http.get(url)
                .then(comicsRecived)
                .catch(failRequest);
        }

        //////////////////////////////// AUX FUNTIONS /////////////////////////////////

        function comicsRecived(response) {
            /* Check si ha arrayComics por que esto significa que si hay ha habido una peticion ya y lo que estamos es eliminar imagenes no validas y haces una peticion inferior a 3 */
            let arrayComics = [];
            let data = response.data.data.results;
            vm.offsetCount += vm.offset;

            console.log(data);
            for (let i = 0; i < data.length; i++) {
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