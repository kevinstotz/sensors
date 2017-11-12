'use strict';

hotPotatoEngineApp.service('TokenService', ['$rootScope', '$cookies', 'COOKIE',
    function($rootScope, $cookies, COOKIE) {
        var tokenService = {

            get: function () {
                if (typeof $cookies.getObject(COOKIE) != "undefined") {

                        if (typeof $cookies.getObject(COOKIE + '.currentUser.token') != "undefined") {
                            return $cookies.getObject(COOKIE + '.currentUser.token');
                        }

                }
                return "";
            },

            set: function (token) {
                $rootScope.globals.currentUser.token = token;
                $cookies.putObject(COOKIE + '.currentUser.token', token);
            },

            clear: function () {
                if (typeof $cookies != "undefined") {
                    if (typeof $cookies.getObject(COOKIE) != "undefined") {
                        if (typeof $cookies.getObject(COOKIE + '.currentUser') != "undefined") {
                            if (typeof $cookies.getObject(COOKIE + '.currentUser.token') != "undefined") {
                                $cookies.remove(COOKIE + '.currentUser.token');
                            }
                            $cookies.remove(COOKIE + '.currentUser');
                        }
                        $cookies.remove(COOKIE);
                    }
                }
            }
        };
        return tokenService;
    }
]);
