'use strict';

hotPotatoEngineApp.controller('GameUpdateController', [ 'GameUpdate', '$stateParams',
    function(gameUpdate, $stateParams) {
        var gameUpdateCtrl = this;
        gameUpdateCtrl.game;
        gameUpdateCtrl.updateGame = updateGame;

        (function initController() {
            console.log("game update controller");
        })();

        function updateGame(game) {
            gameUpdate.update(game.id, game.name, game.progressive, game.speed.id);
        }
    }]
)
.directive('gameUpdateButton', [ 'PARTIALS_DIR', function(PARTIALS_DIR) {
    return {
        templateUrl: PARTIALS_DIR + '/body/mainbody/gameDetail/gameUpdateButton.ejs',
        replace: true,
        restrict: 'E',
        scope: {
            game: '='
        },
        controller: 'GameUpdateController',
        controllerAs: 'gameUpdateCtrl'
    };
}]);
