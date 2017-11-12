'use strict';

hotPotatoEngineApp.service('GameRound', [ '$resource', 'API', 'API_SERVER', 'GAMEROUND_URL', 'GET', 'TokenService',
    function($resource, API, API_SERVER, GAMEROUND_URL, GET, tokenService) {
        var gr = this;
        gr.rounds = [];
        gr.resource;

        return {
             getRound: getRound
         };

        (function init() {
            console.log("game Round service");
            if (!gr.resource) {
                gr.resource = getResource();
            }
        })();

        function getResource() {

            var _action = "get";
            var _contentType = "application/json";
            var _token = "JWT " + tokenService.get();

            API.setMethod(GET);
            API.setUrl(API_SERVER + GAMEROUND_URL);
            API.setAction(_action);
            API.setHeadersContentType(_contentType);
            API.setStripTrailingSlashes(false);
            API.setHeadersAuthorization(_token);
            API.setIsArray(true);
            //API.setParams({});
            API.setResource();
            return API.getResource();
        }

        function getRound(gameId, roundId) {
            if (!gr.resource) {
                gr.resource = getResource();
            }
            gr.rounds = gr.resource.get(
                {game_id: gameId, round_id: roundId},
                function(data) {
                    console.log("%s %O", "success:game round:", data);
                    gr.rounds = data;
                    return gr.rounds;
                },
                function(error) {
                    console.log("%s %O", "game Round error:", error);
                    // window.location.href = '/login';
                }
            );
            return gr.rounds;
        }
    }
]);
