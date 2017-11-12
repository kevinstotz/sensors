'use strict';

hotPotatoEngineApp.service('GameAdd', [ '$resource', 'API', 'API_SERVER', 'GAMEADD_URL', 'POST', 'TokenService', 'GamesIPlay',
    function($resource, API, API_SERVER, GAMEADD_URL, POST, tokenService, gamesIPlay) {
        var ga = this;
        ga.game;
        ga.resource;

        return {
            add: add
        };

        (function init() {
            if (!ga.getResource) {
                ga.resource = getResource();
            }
        })();

        function getResource() {

            var _action = "save";
            var _contentType = "application/json";
            var _token = "JWT " + tokenService.get();

            API.setMethod(POST);
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

        function add(game) {
            if (!ga.resource) { getResource(); }
            ga.resource.save( {
                    game: game
                },
                function(data) {
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
