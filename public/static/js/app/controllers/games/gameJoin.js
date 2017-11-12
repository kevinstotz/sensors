'use strict';

hotPotatoEngineApp.controller('GameJoinController', [ 'GameJoin', '$state',
    function(gameJoin, $state) {
        var gameJoinCtrl = this;
        gameJoinCtrl.joinGame = joinGame;

        (function initController() {
            console.log("game join controller");
        })();

        function joinGame(gameId) {
            gameJoin.join(gameId);
            $state.go('init', {obj:gameId}, {reload:true, inherit:false});
        }
    }]
)
.directive('gameJoinButton', [ 'PARTIALS_DIR', function(PARTIALS_DIR) {
    return {
        templateUrl: PARTIALS_DIR + '/body/mainbody/gameDetail/gameJoinButton.ejs',
        restrict: 'E',
        scope: {
            gameplayerid: '=',
            gameid: '=',
            userid: '='
        },
        controller: 'GameJoinController',
        controllerAs: 'gameJoinCtrl'
    };
}]);
