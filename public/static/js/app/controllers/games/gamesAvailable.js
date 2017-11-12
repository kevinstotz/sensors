'use strict';

hotPotatoEngineApp.controller('GamesAvailableController', [ 'GamesAvailable',
    function(gamesAvailable) {
        var gamesAvailableCtrl = this;
        gamesAvailableCtrl.gamesAvailableList;

        (function initController() {
            console.log("game list controller");
            gamesAvailableCtrl.gamesAvailableList = gamesAvailable.get();
        })();
    }]
)
.directive('getGamesAvailableList', [ 'PARTIALS_DIR', function(PARTIALS_DIR) {
    return {
        scope: {},
      templateUrl: PARTIALS_DIR + '/body/leftnav/gamesAvailable.ejs',
      restrict: 'E',
      replace: true,
      bindToController: true,
      controller: 'GamesAvailableController',
      controllerAs: 'gamesAvailableCtrl'
    };
}]);
