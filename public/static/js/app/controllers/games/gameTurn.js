'use strict';

hotPotatoEngineApp.controller('GameTurnController', [ 'GameTurn', '$stateParams',
    function(gameTurn, $stateParams) {
        var vm = this;
        vm.getTurn = getTurn;
        vm.gameId = $stateParams.id;

        (function initController() {
            console.log("game turn controller");
        })();

        function getTurn(gameId, roundId, turnId) {
            gameTurn.getTurn(gameId, roundId, turnId);
        }

        function getTurnbyId(turnId) {
            vm.turnid = gameTurn.getTurn(turnId);
        }
    }]
)

.directive('gameTurnTable', [ 'PARTIALS_DIR', function(PARTIALS_DIR) {
    return {
      templateUrl: PARTIALS_DIR + '/body/mainbody/gameDetail/turnTable.ejs',
      replace: false,
      restrict: 'E',
      scope: {
          turn: '=',
          userid: '='
      },
      controller: 'GameTurnController',
      controllerAs: 'vm'
    };
}]);
