'use strict';

hotPotatoEngineApp.controller('GameDeleteController', [ 'GameDelete', '$state',
    function(gameDelete, $state) {
        var gameDeleteCtrl = this;
        gameDeleteCtrl.deleteGame = deleteGame;
        gameDeleteCtrl.game;

        (function initController() {
            console.log("game delete controller");
        })();

        function deleteGame(gameId) {
            gameDelete.remove(gameId);
            $('#gameDeleteModal').modal('hide');
            $state.go('init');
        }
    }]
)
.directive('gameDeleteButton', [ 'PARTIALS_DIR', function(PARTIALS_DIR) {
    return {
      templateUrl: PARTIALS_DIR + '/body/mainbody/gameDetail/gameDeleteButton.ejs',
      restrict: 'E',
      animation: false,
      scope: {gameid: "="},
      controller: 'GameDeleteController',
      controllerAs: 'gameDeleteCtrl'
    };
}]);
