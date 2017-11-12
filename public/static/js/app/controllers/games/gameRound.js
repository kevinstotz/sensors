'use strict';

hotPotatoEngineApp.controller('GameRoundController', [ 'GameRound', '$stateParams',
    function(gameRound, $stateParams) {
        var gameRoundCtrl = this;
        gameRoundCtrl.getRound = getRound;
        gameRoundCtrl.getCurrentRound = getCurrentRound;
        gameRoundCtrl.gameId = $stateParams.id;
        gameRoundCtrl.round;
        (function initController() {
            //getCurrentRound(gameRoundCtrl.gameId);
            console.log("game round controller");
        })();

        function getRound(gameId, roundId) {
            gameRoundCtrl.round = gameRound.getRound(gameId, roundId);
        }

        function getCurrentRound(gameId) {
            gameRoundCtrl.round = gameRound.getRound(gameId, 0);
        }
    }]
);

hotPotatoEngineApp.directive('gameRoundTable', [ 'PARTIALS_DIR', function(PARTIALS_DIR) {
    return {
      templateUrl: PARTIALS_DIR + '/body/mainbody/gameDetail/roundsTable.ejs',
      replace: false,
      scope: {
          rounds: "=",
          gameid: "=",
          userid: "="
      },
      restrict: 'E',
      controller: 'GameRoundController',
      controllerAs: 'gameRoundCtrl',
      link: function(scope, element, attrs, ctrl) {
      }
    };
}]);
