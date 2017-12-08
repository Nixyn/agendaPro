(function () {
    'use strict';

    angular
        .module('AgendaPRO')
        .factory('GifsGiphyProvider', GifsGiphyProvider);

    GifsGiphyProvider.$inject = ['$http'];
    function GifsGiphyProvider($http) {
        
        /* __________________________: Variable Declaration :_________________________ */
        let vm = this;
        vm.search = {
            offsetCount: 0,
            offset: 8,
            limit: 8,
            increaserOffset: function(){
                this.offsetCount += this.offset;
            },
            decreaserOffset: function(){
                if(this.offsetCount>0) this.offsetCount -= this.offset;
            },
            selectVariation: function(direction){
                if(direction=="right") this.increaserOffset();
                else if(direction=="left") this.decreaserOffset();
            }

        }

        /* __________________________: Functions Declaration :_________________________ */
        var service = {
            getSearch: getSearch
        };

        return service;

        //////////////////////////////// MAIN FUNTIONS ////////////////////////////////
        function getSearch(search) {
            let url = "";
            vm.search.selectVariation(search.direction);
            if (search.trending == true) url = "https://api.giphy.com/v1/gifs/trending/search?api_key=FPLQeogCrqyn0ztF519LgsyBZVLlJOYu&q=" + search.text + "&limit=" + vm.search.limit + "&offset=" + vm.search.offsetCount + "&rating=G&lang=en";
            else url = "https://api.giphy.com/v1/gifs/search?api_key=FPLQeogCrqyn0ztF519LgsyBZVLlJOYu&q=" + search.text + "&limit=" + vm.search.limit + "&offset=" + vm.search.offsetCount + "&rating=G&lang=en";
            
            return $http.get(url)
                .then(gifsRecived)
                .catch(failRequest);
        }

        //////////////////////////////// AUX FUNTIONS ////////////////////////////////

        function gifsRecived(response) {
            let arrayGifs = [];
            let data = response.data.data;
            
            for (let i = 0; i < data.length; i++) {
                let gif = {};
                gif.id = data[i].id;
                gif.url = data[i].images.preview_webp.url;
                arrayGifs.push(gif);
            }
            return arrayGifs;
        }

        function failRequest(e) {
            console.error("Error al cargar Giphy compruebe su conexión a internet", e);
        }
    }
})();