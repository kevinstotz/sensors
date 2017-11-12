'use strict';

hotPotatoEngineApp.service('AuthService', ['$resource', '$window', '$location', '$rootScope', 'API', 'API_SERVER', 'LOGINSERVICE_URL',  'POST', 'TokenService', 'CookieService',
    function($resource, $window, $location, $rootScope, API, API_SERVER, LOGINSERVICE_URL, POST, tokenService, cookieService) {
        var as = this;
        as.user = [];
        as.resource = "";

        return {
            login: login,
            logout: logout,
            clearCredentials: clearCredentials,
            confirmLogin: confirmLogin
        };

        function login(credentials) {
            as.resource = getLoginResource();

            as.user = as.resource.save({email:credentials.Email, password:credentials.Password},
                function(response) {
                    var obj = angular.fromJson(response);
                    console.log(obj.status);
                    switch(obj.status) {
                        case '0':
                            setCredentials(credentials.Email, obj.message);
                            $window.sessionStorage.setItem('authenticated', true);
                            $location.path('/sensors');
                            break;
                        default:
                            clearCredentials();
                            console.log("error logging in:" + obj.status + obj.message);
                    }
                },
                function(response) {
                    clearCredentials();
                    var obj = angular.fromJson(response.data);
                    switch(Object.keys(obj)[0]) {
                        case 'non_field_errors':
                            return {'status': 'error', 'error': obj.non_field_errors[0]};
                            break;
                        default:
                            console.log("error logging in AS:" + response.data);
                            return {'status': 'error', 'error': response.data};
                    }
                }
            );
            return as.user;
        }

        function confirmLogin() {
              return 0;
        }

        function setCredentials(username, token) {
            $rootScope.globals.currentUser = {};
            $rootScope.globals.currentUser.username = username;
            $rootScope.globals.currentUser.authenticated = true;
            cookieService.setDefault();
            tokenService.set(token);
        }

        function clearCredentials() {
            $rootScope.globals = {};
            tokenService.clear();
            cookieService.clear();
        }

        function logout() {
            clearCredentials();
            return 0;
        };

        function getRegisterResource() {
            var _action = "post";
            var _contentType = "application/json";

            API.setMethod(POST);
            API.setUrl(API_SERVER + REGISTER_URL);
            API.setAction(_action);
            API.setHeadersContentType(_contentType);
            API.setStripTrailingSlashes(false);
            API.setHeadersAuthorization("JWT ");
            API.setIsArray(false);
            //API.setParams({});
            API.setResource();
            API.resource = API.getResource();
            return API.resource;
        };

        function getLoginResource() {
            var _action = "post";
            var _contentType = "application/json";

            API.setMethod(POST);
            API.setUrl(API_SERVER + LOGINSERVICE_URL);
            API.setAction(_action);
            API.setHeadersContentType(_contentType);
            API.setStripTrailingSlashes(false);
            API.setHeadersAuthorization("JWT " + tokenService.get());
            API.setIsArray(false);
            //API.setParams({});
            API.setResource();
            API.resource = API.getResource();
            return API.resource;
        };


    }
]);
