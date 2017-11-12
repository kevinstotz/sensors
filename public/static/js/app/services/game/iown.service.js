'use strict';

hotPotatoEngineApp.service('GamesIOwn', [ '$resource', 'API', 'API_SERVER', 'GAMESIOWN_URL', 'GET', 'TokenService',
    function($resource, API, API_SERVER, GAMESIOWN_URL, GET, tokenService) {
        var gio = this;
        gio.gameList;
        gio.resource;

        return {
             loadGames: loadGames,
             get: get,
             add: add,
             find: find,
             remove: remove
        };

        (function init() {
            console.log("GamesIOwn service");
            if (!gio.resource) {
                gio.resource = getResource();
            }
        })();

        function getResource() {

            var _action = "query";
            var _contentType = "application/json";
            var _token = "JWT " + tokenService.get();

            API.setMethod(GET);
            API.setUrl(API_SERVER + GAMESIOWN_URL);
            API.setAction(_action);
            API.setHeadersContentType(_contentType);
            API.setStripTrailingSlashes(false);
            API.setHeadersAuthorization(_token);
            API.setIsArray(true);
            //API.setParams({});
            API.setResource();
            gio.resource = API.getResource();
            return gio.resource;
        }

        function loadGames() {
            if (!gio.resource) {
                gio.resource = getResource();
            }

            gio.gameList = gio.resource.query({},
                 function(data) {
                     gio.gameList = data;
                     return gio.gameList;
                 },
                 function(error) {
                     console.log("%s %O", "games I own error:", error);
                     //window.location.href = '/login';
                 }
            );
            return gio.gameList;
        }

        function get() {
            if (!gio.gameList) {
                return loadGames();
            }
            return gio.gameList;
        }

        function add(newGame) {
            console.log("gamelist before push: %O", gio.gameList);
            gio.gameList.push(newGame);
            console.log("gamelist after push: %O", gio.gameList);
            return;
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
            return findWithAttr(ga.gameList, "id", gameId);
        }

        function remove(gameId) {
            var index = findWithAttr(gio.gameList, "id", gameId);
            if (index >= 0) {
                return gio.gameList.splice(index, 1)[0];
            } else {
                console.log("could not find ", gameId);
                return null;
            }
        }
    }
]);
