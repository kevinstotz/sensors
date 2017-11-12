'use strict';

hotPotatoEngineApp.service('UserService', [ '$resource', 'BASEURI', '$window', '$rootScope', 'CookieService', 'API', 'API_SERVER', 'USERSERVICE_URL', 'GET', 'TokenService',
    function($resource, BASEURI, $window, $rootScope, cookieService, API, API_SERVER, USERSERVICE_URL, GET, tokenService) {
        var us = this;
        us.user;
        us.resource;

        return {
             getById: getById,
             getByUsername: getByUsername,
             update: update,
             remove: remove,
             getId: getId
         };

        (function init() {
            console.log("User service");
        })();

        function getResource(action) {

            var _action = action;
            var _contentType = "application/json";
            var _token = "JWT " + tokenService.get();
            API.setMethod(GET);
            API.setUrl(API_SERVER + USERSERVICE_URL);
            API.setAction(_action);
            API.setHeadersContentType(_contentType);
            API.setStripTrailingSlashes(false);
            API.setHeadersAuthorization(_token);
            API.setIsArray(false);
            //API.setParams();
            API.setResource();
            us.resource = API.getResource();
            return us.resource;
        }

        function getById(userId) {
            if (!us.resource) {
                us.resource = getResource("get");
            }
            us.user = us.resource.get({player_id:userId},
                function(data) {
                    us.user = data;
                    return us.user;
                },
                function(error) {
                    console.log("%s %O", "get user service error:", error);
                    //window.location.href = '/login';
                }
            );
            return us.user;
        }

        function getByUsername(username) {
            if (!us.resource) {
                us.resource = getResource("get");
            }
            us.user = us.resource.get({player_username:username},
                function(data) {
                    //us.user = data;
                    //setUserId(us.user.id);
                    console.log(data)
                    $window.location.href = BASEURI;
                    return us.user;
                },
                function(error) {
                    console.log("%s %O", "get by username service error:", error);
                    //window.location.href = '/login';
                }
            );
            return us.user;
        }

        function setUserId(userId) {
            $rootScope.globals.currentUser.userId = userId;
            cookieService.update();
        }

        function getId() {
            return cookieService.get('userId');

        }

        function remove(userId) {
            if (!us.resource) {
                getResource("delete");
            }
            us.user = us.resource.delete({user_id:userId},
                function(data) {
                    us.user = data;
                    return us.user;
                },
                function(error) {
                    console.log("%s %O", "delete user service error:", error);
                    //window.location.href = '/login';
                }
            );
            return us.user;
        }

        function update(userId) {
            if (!us.resource) {
                getResource("update");
            }
            us.user = us.resource.update({user_id:userId},
                function(data) {
                    us.user = data;
                    return us.user;
                },
                function(error) {
                    console.log("%s %O", "update user service error:", error);
                    //window.location.href = '/login';
                }
            );
            return us.user;
        }
    }
]);
