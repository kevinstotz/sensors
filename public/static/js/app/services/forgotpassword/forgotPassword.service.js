'use strict';

hotPotatoEngineApp.service('ForgotPasswordService', [ '$resource', 'API', 'API_SERVER', 'FORGOT_PASSWORD_URL', 'POST',
    function($resource, API, API_SERVER, FORGOT_PASSWORD_URL, POST) {
        var fp = this;
        fp.forgot;
        fp.resource;

        return {
            forgotPassword: forgotPassword
        };

        (function init() {
            if (!fp.getResource) {
                fp.resource = getResource();
            }
        })();

        function getResource() {

            var _action = "save";
            var _contentType = "application/json";
            var _token = "JWT ";

            API.setMethod(POST);
            API.setUrl(API_SERVER + FORGOT_PASSWORD_URL);
            API.setAction(_action);
            API.setHeadersContentType(_contentType);
            API.setStripTrailingSlashes(false);
            API.setHeadersAuthorization(_token);
            API.setIsArray(false);
            //API.setParams({});
            API.setResource();
            fp.resource = API.getResource();
            return fp.resource
        }

        function forgotPassword(email) {
            if (!fp.resource) { getResource(); }
            fp.forgot = fp.resource.save( {
                    email: email
                },
                function(email) {
                     console.log("%s %O", "email success:", email);
                },
                function(error) {
                 console.log("%s %O", "email error:", error);
                 //window.location.href = '/login';
                }
            );
            return  fp.forgot;
        }
    }
]);
