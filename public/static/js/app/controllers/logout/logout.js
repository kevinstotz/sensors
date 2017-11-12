'use strict';

hotPotatoEngineApp.controller('LogoutController', [ '$window', 'AuthService',
    function($window, authService) {
        var logoutCtrl = this;
        logoutCtrl.logout = logout;

        (function initController() {
            console.log("logout controller");
        })();

        function logout() {
            authService.logout();
            $window.location.href = '/';
        };
    }
]);
