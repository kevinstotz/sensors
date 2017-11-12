'use strict';

hotPotatoEngineApp.service('ItemThrow', [ '$resource', 'API', 'API_SERVER', 'ITEMTHROW_URL', 'PATCH', 'TokenService',
    function($resource, API, API_SERVER, ITEMTHROW_URL, PATCH, tokenService) {
        var ithrow = this;
        ithrow.game;
        ithrow.resource;

        return {
            throwItem: throwItem
         };

        (function init() {
            console.log("ItemThrow service");
            if (!ithrow.resource) {
                ithrow.resource = getResource();
            }
        })();

        function getResource() {

            var _action = "update";
            var _contentType = "application/json";
            var _token = "JWT " + tokenService.get();

            API.setMethod(PATCH);
            API.setUrl(API_SERVER + ITEMTHROW_URL);
            API.setAction(_action);
            API.setHeadersContentType(_contentType);
            API.setStripTrailingSlashes(false);
            API.setHeadersAuthorization(_token);
            API.setIsArray(false);
            API.setParams({ 'turn_id': '@turn_id' });
            API.setResource();
            ithrow.resource =  API.getResource();
            return ithrow.resource;
        }

        function throwItem(turnId) {
            if (!ithrow.resource) {
                getResource();
            }

            ithrow.game = ithrow.resource.update(
                {turn_id: turnId},
                function(data) {
                    ithrow.game = data;
                    return ithrow.game;
                },
                function(error) {
                    console.log("%s %O", "item throw error:", error);
                    // window.location.href = '/login';
                }
            );
            return ithrow.game;
        }
    }
]);
