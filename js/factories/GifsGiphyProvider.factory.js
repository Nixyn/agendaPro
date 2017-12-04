(function () {
    'use strict';

    angular
        .module('AgendaPRO')
        .factory('GifsGiphyProvider', GifsGiphyProvider);

    GifsGiphyProvider.$inject = ['$http'];
    function GifsGiphyProvider($http) {
        var service = {
            getSearch: getSearch
        };

        return service;

        ////////////////
        function getSearch(search) {
            let url = "";
            if(search.trending == true) url ="https://api.giphy.com/v1/gifs/trending/search?api_key=FPLQeogCrqyn0ztF519LgsyBZVLlJOYu&q="+search.text+"&limit=25&offset=0&rating=G&lang=en";
            else url = "https://api.giphy.com/v1/gifs/search?api_key=FPLQeogCrqyn0ztF519LgsyBZVLlJOYu&q="+search.text+"&limit=25&offset=0&rating=G&lang=en";
            return $http.get(url)
                .then(gifsRecived)
                .catch();
        }

        function gifsRecived(response){
            let arrayGifsUrl = [];
            let data = response.data.data;
            for(let i=0; i<data.length;i++){
                arrayGifsUrl.push(data[i].images.preview_webp.url);
            }
            return arrayGifsUrl;
        }
    }
})();