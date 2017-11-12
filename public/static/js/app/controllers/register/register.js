'use strict';

hotPotatoEngineApp.controller('RegisterController', [ '$window', 'RegisterService',
    function($window, registerService) {
        var registerCtrl = this;
        registerCtrl.register = register;
        registerCtrl.hasError = false;

        (function initController() {
            console.log("Register controller");
        })();

        function register(credentials) {
            registerCtrl.hasError = false;
            console.log("register called");
            var response = registerService.register(credentials);
        }
    }
]);
