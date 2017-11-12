'use strict';

hotPotatoEngineApp.controller('ItemThrowController', [ 'ItemThrow', '$state',
    function(itemThrow, $state) {
        var itemThrowCtrl = this;
        itemThrowCtrl.throwItem = throwItem;
        itemThrowCtrl.game;

        (function initController() {
            console.log("item throw controller");
        })();

        function throwItem(turnId) {
            itemThrowCtrl.game = itemThrow.throwItem(turnId);
            //$state.go('init', {obj:gameId}, {reload:true, inherit:false});
        }
    }]
)
.directive('itemThrowButton', [ 'PARTIALS_DIR', function(PARTIALS_DIR) {
    return {
      templateUrl: PARTIALS_DIR + '/body/mainbody/gameDetail/itemThrowButton.ejs',
      replace: true,
      restrict: 'E',
      scope: {
          turnid: '=' },
      controller: 'ItemThrowController',
      controllerAs: 'itemThrowCtrl'
    };
}]);
