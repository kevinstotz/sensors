'use strict';

hotPotatoEngineApp.service('GameTurn', [ '$resource', 'API', 'API_SERVER', 'GAMETURN_URL', 'GET', 'TokenService',
    function($resource, API, API_SERVER, GAMETURN_URL, GET, tokenService) {
        var gt = this;
        gt.turns = [];
        gt.resource;

        return {
             getTurn: getTurn
         };

        (function init() {
            console.log("game Turn service");
            if (!gt.resource) {
                gt.resource = getResource();
            }
        })();

        function getResource() {

            var _action = "get";
            var _contentType = "application/json";
            var _token = "JWT " + tokenService.get();

            API.setMethod(GET);
            API.setUrl(API_SERVER + GAMETURN_URL);
            API.setAction(_action);
            API.setHeadersContentType(_contentType);
            API.setStripTrailingSlashes(false);
            API.setHeadersAuthorization(_token);
            API.setIsArray(true);
            //API.setParams({});
            API.setResource();
            return API.getResource();
        }

        function getTurn(gameId, roundId, turnId) {
            if (!gt.resource) {
                gt.resource = getResource();
            }
            gt.turns = gt.resource.get(
                {game_id: gameId, round_id: roundId, turn_id: turnId},
                function(data) {
                    gt.turns = data;
                    console.log("%s %O", "success:game turn:", data);
                    return gt.turns;
                },
                function(error) {
                    console.log("%s %O", "game Turn error:", error);
                    // window.location.href = '/login';
                }
            );
            return gt.turns;
        }
    }
]);
