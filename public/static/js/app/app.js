'use strict';
var API_BASEURI = '/SES';
var API_VERSION = '/v1';
var SITE_URL = 'http://www.yogishouse.com:49160'
var ENGINE_URL = 'http://api.yogishouse.com:8080'
var hotPotatoEngineApp = angular.module('hotPotatoEngineApp', [ 'ngAnimate', 'ui.router', 'ngResource', 'angular.filter', 'ngCookies',] );
angular.module('hotPotatoEngineApp.controllers', []);



hotPotatoEngineApp.constant('HOSTNAME', SITE_URL);
hotPotatoEngineApp.constant('BASEURI', '/data');
hotPotatoEngineApp.constant('PARTIALS_DIR', '/partials');
hotPotatoEngineApp.constant('COOKIE', 'globals');
hotPotatoEngineApp.constant('GET', 'GET');
hotPotatoEngineApp.constant('POST', 'POST');
hotPotatoEngineApp.constant('DELETE', 'DELETE');
hotPotatoEngineApp.constant('PUT', 'PUT');
hotPotatoEngineApp.constant('PATCH', 'PATCH');
hotPotatoEngineApp.constant('OPTIONS', 'OPTIONS');
hotPotatoEngineApp.constant('API_SERVER', ENGINE_URL);

hotPotatoEngineApp.constant('LOGINSERVICE_URL', API_BASEURI + API_VERSION + '/auth/login/');
hotPotatoEngineApp.constant('FORGOT_PASSWORD_URL', API_BASEURI + API_VERSION + '/auth/forgotPassword/');
hotPotatoEngineApp.constant('REGISTER_URL', API_BASEURI + API_VERSION + '/auth/register/');
hotPotatoEngineApp.constant('GAMEADD_URL', API_BASEURI + API_VERSION + '/games/add/');
hotPotatoEngineApp.constant('GAMESSTATUS_URL', API_BASEURI + API_VERSION + '/games/status/');
hotPotatoEngineApp.constant('SPEEDS_URL', API_BASEURI + API_VERSION + '/speeds/');
hotPotatoEngineApp.constant('GAMEJOIN_URL', API_BASEURI + API_VERSION + '/game/join/:game_id');
hotPotatoEngineApp.constant('GAMESTART_URL', API_BASEURI + API_VERSION + '/game/start/:game_id/');
hotPotatoEngineApp.constant('GAMEDETAIL_URL', API_BASEURI + API_VERSION + '/game/:game_id');
hotPotatoEngineApp.constant('GAMEVIEW_URL', API_BASEURI + API_VERSION + '/game/:game_id');
hotPotatoEngineApp.constant('GAMELEAVE_URL', API_BASEURI + API_VERSION + '/game/leave/:game_id');
hotPotatoEngineApp.constant('GAMEUPDATE_URL', API_BASEURI + API_VERSION + '/game/update/:game_id');
hotPotatoEngineApp.constant('GAMEDELETE_URL', API_BASEURI + API_VERSION + '/game/delete/:game_id');
hotPotatoEngineApp.constant('GAMESAVAILABLE_URL', API_BASEURI + API_VERSION + '/games/available/');
hotPotatoEngineApp.constant('GAMESIOWN_URL', API_BASEURI + API_VERSION + '/games/owner/');
hotPotatoEngineApp.constant('GAMESIPLAY_URL', API_BASEURI + API_VERSION + '/games/playing/');
hotPotatoEngineApp.constant('ITEMTHROW_URL', API_BASEURI + API_VERSION + '/game/round/turn/throw/:turn_id/');
hotPotatoEngineApp.constant('GAMEROUND_URL', API_BASEURI + API_VERSION + '/game/round/:game_id/:round_id/');
hotPotatoEngineApp.constant('GAMETURN_URL', API_BASEURI + API_VERSION + '/game/round/turn/:game_id/:round_id/:turn_id/');
hotPotatoEngineApp.constant('USERSERVICE_URL', API_BASEURI + API_VERSION + '/player/:player_username');

hotPotatoEngineApp.config([
       '$httpProvider', '$stateProvider', '$resourceProvider', '$sceDelegateProvider', '$urlRouterProvider', '$locationProvider', 'BASEURI', 'PARTIALS_DIR',
    function config($httpProvider, $stateProvider, $resourceProvider, $sceDelegateProvider, $urlRouterProvider, $locationProvider, BASEURI, PARTIALS_DIR) {

        $urlRouterProvider.otherwise('/sensors');

        // httpProvider settings
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.useXDomain = true;

        // resourceProvider settings
        $resourceProvider.defaults.stripTrailingSlashes = false;

        // sceDelegateProvider settings
        $sceDelegateProvider.resourceUrlWhitelist([
          // Allow same origin resource loads.
          'self',
          // Allow loading from our assets domain.  Notice the difference between * and **.
          ENGINE_URL + '/**'
        ]);

        // locationProvider settings
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode({
            enabled:true,
            requireBase:false
        });


        $stateProvider
            // HOME STATES AND NESTED VIEWS ========================================
            .state('init', {
                url: BASEURI,
                views: {

                    // the main template will be placed here (relatively named)
                    'centerBody@': {
                        templateUrl: PARTIALS_DIR + '/body/mainbody/mainbody.ejs'
                    },

                    'leftSide@': {
                        template: 'left side'
                    },

                    // for column two, we'll define a separate controller
                    'rightSide@': {
                        template: 'right side'
                    }
                }
            })
    }
]);
