'use strict';

hotPotatoEngineApp.service('RegisterService', [ '$resource', 'API', 'API_SERVER', 'REGISTER_URL', 'POST',
    function($resource, API, API_SERVER, REGISTER_URL, POST) {
        var reg = this;
        reg.register;
        reg.resource;

        return {
            register: register
        };

        (function init() {
            if (!reg.getResource) {
                reg.resource = getResource();
            }
        })();

        function getResource() {

            var _action = "save";
            var _contentType = "application/json";
            var _token = "JWT ";

            API.setMethod(POST);
            API.setUrl(API_SERVER + REGISTER_URL);
            API.setAction(_action);
            API.setHeadersContentType(_contentType);
            API.setStripTrailingSlashes(false);
            API.setHeadersAuthorization(_token);
            API.setIsArray(false);
            //API.setParams({});
            API.setResource();
            reg.resource = API.getResource();
            return reg.resource
        }

        function register(register_data) {
            if (!reg.resource) { getResource(); }
            reg.resource.save( {
                    register_data: register_data
                },
                function(register_data) {
                     console.log("%s %O", "register success:", register_data);
                },
                function(error) {
                 console.log("%s %O", "register error:", error);
                 //window.location.href = '/login';
                }
            );
        }
    }
]);
