'use strict';

hotPotatoEngineApp.controller('CountDownTimerController', [ '$timeout',
    function($timeout) {
        var countDownTimerCtrl = this;
        countDownTimerCtrl.startTimer = startTimer;
        countDownTimerCtrl.now;
        countDownTimerCtrl.counter;
        (function initController() {
            console.log("count down timer Controller");
        })();

        function startTimer(starttime, receivedtime) {
            var now = new Date();
            var speed = 60000;
            countDownTimerCtrl.starttime = new Date(starttime);
            countDownTimerCtrl.receivedtime = new Date(receivedtime);

            var seconds=Math.floor((countDownTimerCtrl.receivedtime.getTime() - countDownTimerCtrl.starttime.getTime())/1000);
            var minutes=Math.floor(((countDownTimerCtrl.receivedtime.getTime() - countDownTimerCtrl.starttime.getTime())/60000));
            var hours=Math.floor(((countDownTimerCtrl.receivedtime.getTime() - countDownTimerCtrl.starttime.getTime())/(60000*60)));
            var days=Math.floor(((countDownTimerCtrl.receivedtime.getTime() - countDownTimerCtrl.starttime.getTime())/(60000*24*60)));
            var mytimeout = $timeout(countDownTimerCtrl.onTimeout, 1000);

            if ( (speed - seconds) >= 0 ) {
                mytimeout = null;
                if (seconds < 60) {
                    countDownTimerCtrl.counter = seconds + " seconds";
                }
                if (minutes < 60 && minutes > 0) {
                    countDownTimerCtrl.counter = minutes + " minutes";
                }
                if (hours < 24 && hours > 0) {
                    countDownTimerCtrl.counter = hours + " hours";
                }
                if (days >= 1) {
                    countDownTimerCtrl.counter = "Over a day";
                }
            }
            if (!isNaN(seconds)) {
                if ( (speed - seconds) < 0 ) {
                    countDownTimerCtrl.counter =  "Missed it";
                }
            }

            countDownTimerCtrl.onTimeout = function() {
                countDownTimerCtrl.counter--;
                mytimeout = $timeout(countDownTimerCtrl.onTimeout,1000);
            }
        }
    }
])

.directive('countDownTimer', [ function() {
    return {
      template: "<div>{{countDownTimerCtrl.counter}}</div>",
      replace: true,
      restrict: 'E',
      scope: {  starttime: '@',
                receivedtime: '@' },
      controller: 'CountDownTimerController',
      controllerAs: 'countDownTimerCtrl',
      link: function (scope, element, attr, countDownTimerCtrl) {
          countDownTimerCtrl.startTimer(attr.starttime, attr.receivedtime );
      }
    };
}]);
