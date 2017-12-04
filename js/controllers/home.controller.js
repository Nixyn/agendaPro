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
        vm.gifs = [];
        vm.comics = [];
        vm.searchComics = {};
        vm.searchGifs = {};
        vm.view = 0;
        
        // Functions Declaration
        vm.addUser = addUser;
        vm.loadUserToEdit = loadUserToEdit;
        vm.editUser = editUser;
        vm.deleteUser = deleteUser;
        vm.loadGifsSearch = loadGifsSearch;
        vm.changeView = changeView;
        vm.addGif = addGif;
        vm.removeGif = removeGif;
        vm.loadComicsSearch = loadComicsSearch;
        vm.addComic = addComic;
        vm.removeComic = removeComic;
        vm.checkFavComics = checkFavComics;
        vm.checkFavGifs = checkFavGifs;

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

        function changeView(view){
            if(view==0) vm.view = 0;
            if(view==1) vm.view = 1;
            if(view==2) vm.view = 2;
        }

        function loadGifsSearch(search) {
            GifsGiphyProvider.getSearch(search).then(response => vm.gifs = response);
            vm.searchGif.text = "";
        }

        function addGif(gif) {
            checkExistFavGifs();

            let isExistId = vm.newUser.favGifs.includes(gif); 
       
            if (!isExistId) {
                vm.newUser.favGifs.push(gif);
            }
        }

        function removeGif(gif) {
            for (let i = 0; i < vm.newUser.favGifs.length; i++) {
                const userID = vm.newUser.favGifs[i].id;
                if (userID == gif.id) vm.newUser.favGifs.splice(i, 1);
            }
        }

        function loadComicsSearch(search) {
            MarvelComicsProvider.getSearch(search).then(response => vm.comics = response);
            vm.searchComics.text = "";
        }

        function addComic(comic) {
            checkExistFavComics();
            
            let isExistId = vm.newUser.favComics.includes(comic);

            if (!isExistId) {
                vm.newUser.favComics.push(comic);
            }
        }
        
        function removeComic(comic) {
            for (let i = 0; i < vm.newUser.favComics.length; i++) {
                const userID = vm.newUser.favComics[i].id;
                if (userID == comic.id) vm.newUser.favComics.splice(i, 1);
            }
        }

        function checkFavGifs(item){
            checkExistFavGifs();            
            return vm.newUser.favGifs.includes(item);
        }

        function checkFavComics(item){
            checkExistFavComics();
            return vm.newUser.favComics.includes(item);
        }
        //////////////// AUX FUNCTIONS

        function createID() {
            return Math.random().toString(36).substr(2, 10);
        }

        function cleanFields() {
            vm.newUser = {};
            vm.isEditProcess = false;
        }        

        function checkExistFavGifs() {
            if (typeof vm.newUser.favGifs === "undefined") vm.newUser.favGifs = [];
        }

        function checkExistFavComics() {
            if (typeof vm.newUser.favComics === "undefined") vm.newUser.favComics = [];
        }
    }
})();