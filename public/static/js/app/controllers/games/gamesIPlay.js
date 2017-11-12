'use strict';

hotPotatoEngineApp.controller('GamesIPlayController', [ 'GamesIPlay',
    function(gamesIPlay) {

        var gamesIPlayCtrl = this;
        gamesIPlayCtrl.gamesIPlay = gamesIPlay;
        (function initController() {
            console.log("gamesIPlay controller:");
            gamesIPlayCtrl.gamesIPlayList = gamesIPlay.get();
        })();
    }]
)
.directive('getGamesIPlayList', [ 'PARTIALS_DIR', function(PARTIALS_DIR) {
    return {
      scope: {},
      templateUrl: PARTIALS_DIR + '/body/leftnav/gamesIPlay.ejs',
      restrict: 'E',
      replace: true,
      bindToController: true,
      controller: 'GamesIPlayController',
      controllerAs: 'gamesIPlayCtrl'
    };
}]);
