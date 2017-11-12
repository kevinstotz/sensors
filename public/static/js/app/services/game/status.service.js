'use strict';

hotPotatoEngineApp.service('Status', [ '$resource', 'API', 'API_SERVER', 'GAMESSTATUS_URL', 'GET', 'TokenService',
    function($resource, API, API_SERVER, GAMESSTATUS_URL, GET, tokenService) {
        var vm = this;
        vm.statusList;
        vm.resource;

        return {
             loadStatus: loadStatus,
             get: get
         };

        (function init() {
            console.log("Status service");
            if (!vm.resource) {
                getResource();
            }
        })();

        function getResource() {
             var _action = "query";
             var _contentType = "application/json";
             var _token = "JWT " + tokenService.get();

             API.setMethod(GET);
             API.setUrl(API_SERVER + GAMESSTATUS_URL);
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

         function loadStatus() {
             if (!vm.resource) {
                 getResource();
             }

            vm.statusList = vm.resource.query({status_id: statusId},
                 function(data) {
                     vm.statusList = data;
                     return vm.statusList;
                 },
                 function(error) {
                     console.log("%s %O", "status List error:", error);
                     window.location.href = '/login';
                 }
            );
            return vm.statusList;
        }

        function get() {
            if (!vm.statusList) {
                return loadStatus();
            }
            return vm.statusList;
        }

    }
]);
