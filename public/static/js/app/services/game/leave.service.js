'use strict';

hotPotatoEngineApp.service('GameLeave', [ '$resource', 'API', 'API_SERVER', 'GAMELEAVE_URL', 'PUT', 'TokenService', 'GamesIPlay', 'GamesAvailable',
    function($resource, API, API_SERVER, GAMELEAVE_URL, PUT, tokenService, gamesIPlay, gamesAvailable) {
        var gl = this;
        gl.game;
        gl.resource;

        return {
            leave: leave
         };

        (function init() {
            console.log("GameLeave service");
            if (!gl.resource) {
                gl.resource = getResource();
            }
        })();

        function getResource() {

            var _action = "update";
            var _contentType = "application/json";
            var _token = "JWT " + tokenService.get();

            API.setMethod(PUT);
            API.setUrl(API_SERVER + GAMELEAVE_URL);
            API.setAction(_action);
            API.setHeadersContentType(_contentType);
            API.setStripTrailingSlashes(false);
            API.setHeadersAuthorization(_token);
            API.setIsArray(false);
            API.setParams({ 'game_id': '@game_id'});
            API.setResource();
            return API.getResource();
        }

        function leave(gameId) {
            if (!gl.resource) {
                gl.resource = getResource();
            }
            gl.game = gl.resource.update(
                {game_id: gameId},
                function(data) {
                    console.log("%s %O", "success:leave game:", data);
                    var game = gamesIPlay.remove(gameId);
                    if (game == 0 || game == 1)  {
                        // found and im the owner

                    } else {
                        gamesAvailable.add(game);
                        gl.game = game;
                        return gl.game;
                    }

                },
                function(error) {
                    console.log("%s %O", "game leave error:", error);
                    // window.location.href = '/login';
                }
            );
            return gl.game;
        }
    }
]);
