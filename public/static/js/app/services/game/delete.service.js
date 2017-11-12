'use strict';

hotPotatoEngineApp.service('GameDelete', [ '$resource', 'API', 'API_SERVER', 'GAMEDELETE_URL', 'DELETE', 'TokenService', 'GamesIPlay', 'GamesAvailable',
    function($resource, API, API_SERVER, GAMEDELETE_URL, DELETE, tokenService, gamesIPlay, gamesAvailable) {
        var dg = this;
        dg.game;
        dg.resource;

        return {
            remove: remove
        };

        (function initController() {

        })();

            function getResource() {

                var _action = "delete";
                var _contentType = "application/json";
                var _token = "JWT " + tokenService.get();

                API.setMethod(DELETE);
                API.setUrl(API_SERVER + GAMEDELETE_URL);
                API.setAction(_action);
                API.setHeadersContentType(_contentType);
                API.setStripTrailingSlashes(false);
                API.setHeadersAuthorization(_token);
                API.setIsArray(false);
                API.setParams({ 'game_id': '@game_id'});
                API.setResource();
                dg.resource = API.getResource();
                return dg.resource;
            }

            function remove(gameId) {
                if (!dg.resource) {
                    getResource();
                }

                dg.game = dg.resource.delete(
                    { game_id: gameId },
                    function(data) {
                        gamesIPlay.deleteAll(gameId);
                        gamesAvailable.remove(gameId);
                    },
                    function(error) {
                        console.log("%s %O", "game delete error:", error);
                        //window.location.href = '/login';
                    }
               );

            }

    }
]);
