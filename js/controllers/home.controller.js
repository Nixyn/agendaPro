(function () {
    'use strict';

    angular
        .module('AgendaPRO')
        .controller('HomeController', HomeController);

    HomeController.$inject = ["UsersLocalProvider", "GifsGiphyProvider", "MarvelComicsProvider"];
    function HomeController(UsersLocalProvider, GifsGiphyProvider, MarvelComicsProvider) {
        // Variables Declaration
        var vm = this;
        vm.users = [];
        vm.newUser = {};
        vm.isEditProcess = false;
        vm.gifs = []
        vm.comics = []

        // Functions Declaration
        vm.addUser = addUser;
        vm.loadUserToEdit = loadUserToEdit;
        vm.editUser = editUser;
        vm.deleteUser = deleteUser;
        vm.loadGifsSearch = loadGifsSearch;
        vm.addGif = addGif;
        vm.removeGif = removeGif;
        vm.loadComicsSearch = loadComicsSearch;
        vm.addComic = addComic;
        vm.removeComic = removeComic;

        activate();

        //////////////// MAIN FUNCTIONS

        function activate() {
            vm.users = UsersLocalProvider.getUsers()
        }

        function addUser() {
            vm.newUser.id = createID();
            UsersLocalProvider.add(vm.newUser);
            vm.users.push(vm.newUser);
            cleanFields();
        }

        function loadUserToEdit(userToEdit) {
            vm.newUser = Object.assign({}, userToEdit);
            vm.isEditProcess = true;
        }

        function editUser() {
            let idToEdit = vm.newUser.id;

            for (let i = 0; i < vm.users.length; i++) {
                const userID = vm.users[i].id;
                if (userID == idToEdit) vm.users[i] = vm.newUser;
            }
            UsersLocalProvider.editUser(vm.newUser);
            cleanFields();
        }

        function deleteUser(userToDelete) {
            let stringConfirm = prompt("Para borra el usuario se necesita escribir su nombre:   ");
            let idToDelete = userToDelete.id;

            if (stringConfirm == userToDelete.name) {
                for (let i = 0; i < vm.users.length; i++) {
                    const userID = vm.users[i].id;
                    if (userID == idToDelete) vm.users.splice(i, 1);
                }

                UsersLocalProvider.remove(userToDelete);
            }
        }

        function loadGifsSearch(search) {
            GifsGiphyProvider.getSearch(search).then(gifsRecived);
        }

        function addGif(gif) {
            let gifToAdd = {};
            checkExistFavGifs();
            let isNotExistId = vm.newUser.favGifs.find(favGif => { return favGif.id == gif.id });
            if (typeof isNotExistId === "undefined") {
                gifToAdd.id = gif.id;
                gifToAdd.url = gif.images.preview_webp.url;
                vm.newUser.favGifs.push(gifToAdd);
            }
            console.log(vm.newUser.favGifs);
        }

        function removeGif(gif) {
            for (let i = 0; i < vm.newUser.favGifs.length; i++) {
                const userID = vm.newUser.favGifs[i].id;
                if (userID == gif.id) vm.newUser.favGifs.splice(i, 1);
            }
        }

        function loadComicsSearch(search) {
            MarvelComicsProvider.getSearch(search).then(comicsRecived);
        }

        function addComic(comic) {
            let comicToAdd = {};
            checkExistFavComics();
            let isNotExistId = vm.newUser.favComics.find(favComic => { return favComic.id == comic.id });
            if (typeof isNotExistId === "undefined") {
                comicToAdd.id = comic.id;
                comicToAdd.url = comic.images.preview_webp.url;
                vm.newUser.favComics.push(comicToAdd);
            }
            console.log(vm.newUser.favComics);
        }
        
        function removeComic(comic) {
            for (let i = 0; i < vm.newUser.favComics.length; i++) {
                const userID = vm.newUser.favComics[i].id;
                if (userID == comic.id) vm.newUser.favComics.splice(i, 1);
            }
        }
        //////////////// AUX FUNCTIONS

        function createID() {
            return Math.random().toString(36).substr(2, 10);
        }

        function cleanFields() {
            vm.newUser = {};
            vm.isEditProcess = false;
        }

        function gifsRecived(response) {
            vm.gifs = response;
        }

        function checkExistFavGifs() {
            if (typeof vm.newUser.favGifs === "undefined") vm.newUser.favGifs = [];
        }
        
        function comicsRecived(response) {
            vm.comics = response;
        }
        function checkExistFavComics() {
            if (typeof vm.newUser.favComics === "undefined") vm.newUser.favComics = [];
        }
    }
})();