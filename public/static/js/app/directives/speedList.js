'use strict';

hotPotatoEngineApp.directive('speedListControl', [ 'PARTIALS_DIR', 'Speed', function(PARTIALS_DIR, speed) {
    return {
      templateUrl: PARTIALS_DIR + '/directives/speedlist.ejs',
      replace: false,
      restrict: 'E',
      controllerAs: 'speedListCtrl',
      bindToController: {
          choice: '='
      },
      controller:  function() {
         var speedListCtrl = this;
         speedListCtrl.speeds;
         speedListCtrl.speeds = speed.get();
      }
    };
}]);
