'use strict';

hotPotatoEngineApp.controller('GameLeaveController', [ 'GameLeave', '$state',
    function(gameLeave, $state) {
        var gameLeaveCtrl = this;
        gameLeaveCtrl.leaveGame = leaveGame;
        gameLeaveCtrl.game;

        (function initController() {
            console.log("game leave controller");
        })();

        function leaveGame(gameId) {
            gameLeaveCtrl.game = gameLeave.leave(gameId);
            $state.go('init', {obj:gameId}, {reload:true, inherit:false});
        }
    }]
);

hotPotatoEngineApp.directive('gameLeaveButton', [ 'PARTIALS_DIR', function(PARTIALS_DIR) {
    return {
      templateUrl: PARTIALS_DIR + '/body/mainbody/gameDetail/gameLeaveButton.ejs',
      restrict: 'E',
      replace: true,
      scope: {
                gameplayerid: '=',
                gameid: '=',
                userid: '='
    },
    controller: 'GameLeaveController',
    controllerAs: 'gameLeaveCtrl'
    };
}]);
