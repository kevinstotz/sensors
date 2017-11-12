'use strict';

hotPotatoEngineApp.controller('GameViewController', [ 'GameView', 'TokenService', '$stateParams',
    function(gameView, tokenService, $stateParams) {
        var gameViewCtrl = this;
        gameViewCtrl.viewGame = viewGame;
        gameViewCtrl.viewGame($stateParams.id);

        (function initController() {
            console.log("Game View Controller");
        })();

        function viewGame(gameId) {
            gameViewCtrl.game = gameView.getView(gameId);
        }
    }]
)
.directive('viewGameTable', [ 'PARTIALS_DIR', function(PARTIALS_DIR) {
    return {
      templateUrl: PARTIALS_DIR + '/body/mainbody/gameView/viewGameTable.ejs',
      replace: true,
      restrict: 'E'
    };
}]);
