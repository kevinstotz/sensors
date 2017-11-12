'use strict';

hotPotatoEngineApp.service('Speed', [ '$resource', 'API', 'API_SERVER', 'SPEEDS_URL', 'GET', 'TokenService',
    function($resource, API, API_SERVER, SPEEDS_URL, GET, tokenService) {
        var vm = this;
        vm.speedList;
        vm.resource;

        return {
             loadSpeed: loadSpeed,
             get: get
         };

        (function init() {
            console.log("Speed service");
            if (!vm.resource) {
                getResource();
            }
        })();

        function getResource() {
             var _action = "query";
             var _contentType = "application/json";
             var _token = "JWT " + tokenService.get();

             API.setMethod(GET);
             API.setUrl(API_SERVER + SPEEDS_URL);
             API.setAction(_action);
             API.setHeadersContentType(_contentType);
             API.setStripTrailingSlashes(false);
             API.setHeadersAuthorization(_token);
             API.setIsArray(true);
             //API.setParams({});
             API.setResource();
             vm.resource =  API.getResource();
             return vm.resource;
         }

         function loadSpeed() {
             if (!vm.resource) {
                 getResource();
             }

            vm.speedList = vm.resource.query({},
                 function(data) {
                     vm.speedList = data;
                     return vm.speedList;
                 },
                 function(error) {
                     console.log("%s %O", "speed List error:", error);
                     window.location.href = '/login';
                 }
            );
            return vm.speedList;
        }

        function get() {
            if (!vm.speedList) {
                return loadSpeed();
            }
            return vm.speedList;
        }

    }
]);
