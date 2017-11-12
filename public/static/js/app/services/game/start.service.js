'use strict';

hotPotatoEngineApp.service('GameStart', [ '$resource', 'API', 'API_SERVER', 'GAMESTART_URL', 'PUT', 'TokenService',
    function($resource, API, API_SERVER, GAMESTART_URL, PUT, tokenService) {
        var gs = this;
        gs.game;
        gs.resource;

        return {
             start: start
         };

        (function init() {
            console.log("GameStart service");
            if (!gs.resource) {
                gs.resource = getResource();
            }
        })();

        function getResource() {

            var _action = "update";
            var _contentType = "application/json";
            var _token = "JWT " + tokenService.get();

            API.setMethod(PUT);
            API.setUrl(API_SERVER + GAMESTART_URL);
            API.setAction(_action);
            API.setHeadersContentType(_contentType);
            API.setStripTrailingSlashes(false);
            API.setHeadersAuthorization(_token);
            API.setIsArray(false);
            API.setParams({ 'game_id': '@game_id' });
            API.setResource();
            return API.getResource();
        }

        function start(gameId) {
            if (!gs.resource) {
                gs.resource = getResource();
            }
            gs.game = gs.resource.update(
                {game_id: gameId},
                function(data) {
                    return data;
                },
                function(error) {
                    console.log("%s %O", "game Start error:", error);
                    window.location.href = '/login';
                }
            );
            return gs.game;
        }
    }
]);
