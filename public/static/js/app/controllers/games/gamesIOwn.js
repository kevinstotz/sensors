'use strict';

hotPotatoEngineApp.controller('GamesIOwnController', [ 'GamesIOwn',
    function(gamesIOwn) {

        var gamesIOwnCtrl = this;
        gamesIOwnCtrl.gamesIOwn = gamesIOwn;

        (function initController() {
            console.log("gamesIOwn controller");
            //gamesIOwnCtrl.gamesIOwnList = gamesIOwn.get();
        })();
    }
])
.directive('getGamesIOwnList', [ 'PARTIALS_DIR', function(PARTIALS_DIR) {
    return {
        scope: {},
        templateUrl: PARTIALS_DIR + '/body/leftnav/gamesIOwn.ejs',
        replace: true,
        restrict: 'E',
        bindToController: true,
        controller: 'GamesIOwnController',
        controllerAs: 'gamesIOwnCtrl'
    };
}]);
