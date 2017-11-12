'use strict';

hotPotatoEngineApp.service('GameView', [ '$resource', 'API', 'API_SERVER', 'GAMEVIEW_URL', 'GET', 'TokenService',
    function($resource, API, API_SERVER, GAMEVIEW_URL, GET, tokenService) {
        var gv = this;
        gv.resource;
        gv.game;

        (function init() {
            if (!gv.resource) {
                gv.resource = getResource();
            }
        })();

        return {
            getView: getView
        }

        function getResource() {

            var _action = "get";
            var _contentType = "application/json";
            var _token = "JWT " + tokenService.get();

            API.setMethod(GET);
            API.setUrl(API_SERVER + GAMEVIEW_URL);
            API.setAction(_action);
            API.setHeadersContentType(_contentType);
            API.setStripTrailingSlashes(false);
            API.setHeadersAuthorization(_token);
            API.setIsArray(false);
            //API.setParams({});
            API.setResource();
            gv.resource = API.getResource();
            return gv.resource;
        }

        function getView(gameId) {
            gv.game = gv.resource.get({game_id:gameId},
                function(data) {
                    console.log("%s %O", "game View success:", data);
                    gv.game = data;
                    return gv.game;
                },
                function(error) {
                    console.log("%s %O", "game View error:", error);
                    //window.location.href = '/login';
                }
            );
            return gv.game;
        }
    }
]);
