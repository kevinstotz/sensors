'use strict';

hotPotatoEngineApp.service('CookieService', [ '$cookies', 'COOKIE', '$rootScope',
    function($cookies, COOKIE, $rootScope) {

        return {
            setDefault: setDefault,
            get: get,
            update: update,
            clear: clear
        };

        function setDefault() {
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 28);
            $cookies.putObject(COOKIE, $rootScope.globals, { expires: cookieExp });
        }

        function get(cookie) {
            return $cookies.getObject('globals').currentUser[cookie];
        }

        function update() {
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 28);
            $cookies.putObject(COOKIE, $rootScope.globals, { expires: cookieExp });
            //return $cookies.putObject(COOKIE + '.currentUser.' + cookie, value);
        }

        function clear() {
            return $cookies.remove(COOKIE);
        }
    }
]);
