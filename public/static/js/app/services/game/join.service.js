'use strict';

hotPotatoEngineApp.service('GameJoin', [ '$resource', 'API', 'API_SERVER', 'GAMEJOIN_URL', 'POST', 'TokenService', 'GamesIPlay', 'GamesAvailable',
    function($resource, API, API_SERVER, GAMEJOIN_URL, POST, tokenService, gamesIPlay, gamesAvailable) {
        var gj = this;
        gj.game;
        gj.resource;

        return {
             join: join
         };

        (function init() {
            console.log("GameJoin service");
            if (!gj.resource) {
                gj.resource = getResource();
            }
        })();

        function getResource() {

            var _action = "update";
            var _contentType = "application/json";
            var _token = "JWT " + tokenService.get();

            API.setMethod(POST);
            API.setUrl(API_SERVER + GAMEJOIN_URL);
            API.setAction(_action);
            API.setHeadersContentType(_contentType);
            API.setStripTrailingSlashes(false);
            API.setHeadersAuthorization(_token);
            API.setIsArray(false);
            API.setParams({ 'game_id': '@game_id'});
            API.setResource();
            return API.getResource();
        }

        function join(gameId) {
            if (!gj.resource) {
                gj.resource = getResource();
            }
            gj.game = gj.resource.update(
                {game_id: gameId},
                function(data) {
                    if (gamesAvailable.find(gameId) >= 0) {
                        gamesIPlay.add(gamesAvailable.remove(gameId));
                        gj.game = data;
                    }
                    return gj.game;
                },
                function(error) {
                    console.log("%s %O", "game Join error:", error);
                    window.location.href = '/login';
                }
            );
            return gj.game;
        }
    }
]);
