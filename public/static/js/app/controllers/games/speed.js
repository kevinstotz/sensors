'use strict';

hotPotatoEngineApp.controller('GameAddController', [ '$state', 'GameAdd', 'Speed',
    function($state, gameAdd, speed) {
        var gameAddCtrl = this;
        gameAddCtrl.addGame = addGame;
        gameAddCtrl.game;
        gameAddCtrl.speedList;

        (function initController() {
            gameAddCtrl.speedList = speed.loadSpeed();
            console.log("Game Add Controller");
        })();

        function addGame(name) {
            console.log("%s %O", "game:", name);
             gameAddCtrl.game = gameAdd.add(name);
            //$state.go('init.detail', {obj:gameAddCtrl.game}, {reload:true, inherit:false});
        }
    }
])

.directive('gameAddButton', [ 'PARTIALS_DIR', function(PARTIALS_DIR) {
    return {
      templateUrl: PARTIALS_DIR + '/body/mainbody/gameAdd/gameAddButton.ejs',
      replace: true,
      restrict: 'E',
      bindToController: true,
      controller: 'GameAddController',
      controllerAs: 'gameAddCtrl'
    };
}])

.directive('gameAddForm', [ 'PARTIALS_DIR', function(PARTIALS_DIR) {
    return {
      templateUrl: PARTIALS_DIR + '/body/mainbody/gameAdd/gameAddForm.ejs',
      replace: true,
      restrict: 'E',
      bindToController: true,
      controller: 'GameAddController',
      controllerAs: 'gameAddCtrl'
    };
}]);
