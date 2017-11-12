'use strict';

hotPotatoEngineApp.controller('GameDetailController', [ 'GameDetail', '$stateParams', 'UserService',
    function(gameDetail, $stateParams, userService) {
        var gameDetailCtrl = this;
        gameDetailCtrl.detailGame = detailGame;
        gameDetailCtrl.detailGame($stateParams.id);
        gameDetailCtrl.userid = userService.getId();
        (function initController() {
            console.log("Game Detail Controller");
        })();

        function detailGame(gameId) {
            gameDetailCtrl.game = gameDetail.detail(gameId);
        }
    }
])

.directive('gameDetailForm', [ 'PARTIALS_DIR',
    function(PARTIALS_DIR) {
    return {
      templateUrl: PARTIALS_DIR + '/body/mainbody/gameDetail/gameDetailForm.ejs',
      replace: true,
      restrict: 'E',
      animation: false
    };
}])


.directive('gameDetailView', [ 'PARTIALS_DIR',
    function(PARTIALS_DIR) {
    return {
      templateUrl: PARTIALS_DIR + '/body/mainbody/gameDetail/gameDetailView.ejs',
      replace: true,
      restrict: 'E',
      scope: {game: "="},
      controller: 'GameDetailController',
      controllerAs: 'gameDetailCtrl'
    };
}]);
