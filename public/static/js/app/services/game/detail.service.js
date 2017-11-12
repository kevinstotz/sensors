'use strict';

hotPotatoEngineApp.service('GameDetail', [ '$resource', 'API', 'API_SERVER', 'GAMEDETAIL_URL', 'GET', 'TokenService',
    function($resource, API, API_SERVER, GAMEDETAIL_URL, GET, tokenService) {
        var gd = this;
        gd.game;
        gd.resource;

        return {
             detail: detail
         };

        (function init() {
            console.log("GameDetail service");
            if (!gd.resource) {
                getResource();
            }
        })();

        function getResource() {

            var _action = "get";
            var _contentType = "application/json";
            var _token = "JWT " + tokenService.get();

            API.setMethod(GET);
            API.setUrl(API_SERVER + GAMEDETAIL_URL);
            API.setAction(_action);
            API.setHeadersContentType(_contentType);
            API.setStripTrailingSlashes(false);
            API.setHeadersAuthorization(_token);
            API.setIsArray(false);
            //API.setParams();
            API.setResource();
            gd.resource =  API.getResource();
            return gd.resource;
        }

        function detail(gameId) {
            if (!gd.resource) {
                getResource();
            }
            gd.game = gd.resource.get({game_id:gameId},
                function(data) {
                    gd.game = data;
                    return gd.game;
                },
                function(error) {
                    console.log("%s %O", "gamedetail error:", error);
                    window.location.href = '/login';
                }
            );
            return gd.game;
        }
    }
]);
