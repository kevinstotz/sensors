'use strict';

hotPotatoEngineApp.service('GamesIPlay', [ '$resource', 'API', 'API_SERVER', 'GAMESIPLAY_URL', 'GET', 'TokenService', 'UserService',
    function($resource, API, API_SERVER, GAMESIPLAY_URL, GET, tokenService, userService) {
        var gip = this;
        gip.gameList;
        gip.resource;

        (function init() {
            if (!gip.resource) {
                gip.resource = getResource();
            }
        })();

        return {
             loadGames: loadGames,
             get: get,
             add: add,
             find: find,
             remove: remove,
             deleteAll: deleteAll
         };

         function getResource() {
            var _action = "query";
            var _contentType = "application/json";
            var _token = "JWT " + tokenService.get();

            API.setMethod(GET);
            API.setUrl(API_SERVER + GAMESIPLAY_URL);
            API.setAction(_action);
            API.setHeadersContentType(_contentType);
            API.setStripTrailingSlashes(false);
            API.setHeadersAuthorization(_token);
            API.setIsArray(true);
            //API.setParams({});
            API.setResource();
            return API.getResource();
        }

        function loadGames() {
            if (!gip.resource) {
                gip.resource = getResource();
            }

            gip.gameList = API.getResource().query({},
                 function(data) {
                     gip.gameList = data;
                     return gip.gameList;
                 },
                 function(error) {
                     console.log("%s %O", "games i am playing error:", error);
                     window.location.href = '/login';
                 }
            );
            return gip.gameList;
        }

        function get() {
            if (!gip.gameList) {
                return loadGames();
            }
            return gip.gameList;
        }

        function add(newGame) {
            gip.gameList.push(newGame);
        }

        function findWithAttr(array, attr, value) {
            for(var i = 0; i < array.length; i += 1) {
                if(array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        }

        function find(gameId) {
            return findWithAttr(ga.gameList, "game_id", gameId);
        }

        function deleteAll(gameId) {
            var index = findWithAttr(gip.gameList, "game_id", gameId);
            if (index >= 0) {
                    gip.gameList.splice(index, 1)[0];
            } else {
                console.log("could not find ", gameId);
                return 1;
            }
        }

        function remove(gameId) {
            var index = findWithAttr(gip.gameList, "game_id", gameId);
            if (index >= 0) {
                if (gip.gameList[index].game_owner == userService.getId()) {
                    gip.gameList[index].player_id = 0;
                    return 0;
                } else {
                    return gip.gameList.splice(index, 1)[0];
                }
            } else {
                console.log("could not find ", gameId);
                return 1;
            }
        }
    }
]);
