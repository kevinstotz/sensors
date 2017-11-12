'use strict';

hotPotatoEngineApp.service('GamesAvailable', [ '$resource', 'API', 'API_SERVER', 'GAMESAVAILABLE_URL', 'GET', 'TokenService',
    function($resource, API, API_SERVER, GAMESAVAILABLE_URL, GET, tokenService) {
        var ga = this;
        ga.gameList;
        ga.resource;

        return {
             loadGames: loadGames,
             get: get,
             add: add,
             find: find,
             remove: remove
         };

        (function init() {
            console.log("GamesAvailable service");
            if (!ga.resource) {
                getResource();
            }
        })();

        function getResource() {
             var _action = "query";
             var _contentType = "application/json";
             var _token = "JWT " + tokenService.get();

             API.setMethod(GET);
             API.setUrl(API_SERVER + GAMESAVAILABLE_URL);
             API.setAction(_action);
             API.setHeadersContentType(_contentType);
             API.setStripTrailingSlashes(false);
             API.setHeadersAuthorization(_token);
             API.setIsArray(true);
             //API.setParams({});
             API.setResource();
             ga.resource =  API.getResource();
             return ga.resource;
         }

         function loadGames() {
             if (!ga.resource) {
                 getResource();
             }

            ga.gameList = ga.resource.query({},
                 function(data) {
                     ga.gameList = data;
                     return ga.gameList;
                 },
                 function(error) {
                     console.log("%s %O", "games Available List error:", error);
                     window.location.href = '/login';
                 }
            );
            return ga.gameList;
        }

        function get() {
            if (!ga.gameList) {
                return loadGames();
            }
            return ga.gameList;
        }

        function add(newGame) {
            ga.gameList.push(newGame);
        }

        function find(gameId) {
            return findWithAttr(ga.gameList, "game_id", gameId);
        }

        function findWithAttr(array, attr, value) {

            for(var i = 0; i < array.length; i += 1) {
                if(array[i][attr] == value) {
                    return i;
                }
            }
            return -1;
        }

        function remove(gameId) {
            var index = findWithAttr(ga.gameList, "game_id", gameId);
            if (index >= 0) {
                return ga.gameList.splice(index, 1)[0];
            } else {
                console.log("could not find ", gameId);
                return null;
            }
        }
    }
]);
