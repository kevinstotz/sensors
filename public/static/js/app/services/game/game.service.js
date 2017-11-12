'use strict';

hotPotatoEngineApp.service('GameService', [ '$resource', 'API', 'API_SERVER', 'GAMEADD_URL', 'GET', 'TokenService',
    function($resource, API, API_SERVER, GAMEADD_URL, POST, tokenService) {
        var gs = this;
        gs.game;
        gs.resource;

        return {
            getGameId: getGameId,
            getCurrentRound: getCurrentRound,
            getCurrentTurn: getCurrentTurn
        };

        (function init() {
            if (!gs.getResource) {
                gs.resource = getResource();
            }
        })();

        function getResource() {

            var _action = "get";
            var _contentType = "application/json";
            var _token = "JWT " + tokenService.get();

            API.setMethod(GET);
            API.setUrl(API_SERVER + GAMEADD_URL);
            API.setAction(_action);
            API.setHeadersContentType(_contentType);
            API.setStripTrailingSlashes(false);
            API.setHeadersAuthorization(_token);
            API.setIsArray(false);
            //API.setParams({});
            API.setResource();
            ga.resource = API.getResource();
            return ga.resource
        }

        function getGameId() {
            if (!ga.resource) { getResource(); }
            ga.resource.save({'name': name },
                function(data) {
                     console.log("%s %O", "success add service:", data);
                     gamesIPlay.add(data);
                 },
                 function(error) {
                     console.log("%s %O", "game add error:", error);
                     //window.location.href = '/login';
                 }
            );
        }
    }
]);
