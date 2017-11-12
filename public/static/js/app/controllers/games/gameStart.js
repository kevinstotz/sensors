'use strict';

hotPotatoEngineApp.controller('GameStartController', [ 'GameStart', '$state',
    function(gameStart, $state) {
        var gameStartCtrl = this;
        gameStartCtrl.startGame = startGame;

        (function initController() {
            console.log("game start controller");
        })();

        function startGame(gameId) {
            gameStart.start(gameId);
            $state.go('init.detail', {}, {reload:true, inherit:false});
        }
    }]
)
.directive('gameStartButton', [ 'PARTIALS_DIR', function(PARTIALS_DIR) {
    return {
      templateUrl: PARTIALS_DIR + '/body/mainbody/gameDetail/gameStartButton.ejs',
      restrict: 'E',
      scope: {gameid: '='},
      controller: 'GameStartController',
      controllerAs: 'gameStartCtrl'
    };
}]);
