'use strict';

hotPotatoEngineApp.factory('GameUpdate', [ '$resource', 'API', 'API_SERVER', 'GAMEUPDATE_URL', 'PATCH', 'TokenService', 'GamesIPlay',
    function($resource, API, API_SERVER, GAMEUPDATE_URL, PATCH, tokenService, gamesIPlay) {
        var gu = this;
        gu.game;
        gu.resource;

        return {
             update: update
         };

        (function init() {
            console.log("GameUpdate service");
            if (!gu.resource) {
                getResource();
            }
        })();

        function getResource() {

            var _action = "update";
            var _contentType = "application/json";
            var _token = "JWT " + tokenService.get();

            API.setMethod(PATCH);
            API.setUrl(API_SERVER + GAMEUPDATE_URL);
            API.setAction(_action);
            API.setHeadersContentType(_contentType);
            API.setStripTrailingSlashes(false);
            API.setHeadersAuthorization(_token);
            API.setIsArray(false);
            API.setParams({ 'game_id': '@game_id'});
            API.setResource();
            gu.resource =  API.getResource();
            return gu.resource;
        }

    function update(gameId, name, progressive, speedId) {
            if (!gu.resource) {
                getResource();
            }
            gu.game = gu.resource.update(
                {
                    game_id: gameId,
                    name: name,
                    progressive: progressive,
                    speed_id: speedId
                },
                function(data) {
                    gu.game = data;
                    var gip = gamesIPlay.get();

                    return gu.game;
                },
                function(error) {
                    console.log("%s %O", "updateGame error:", error);
                    window.location.href = '/login';
                }
            );
            return gu.game;
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
    }
]);
