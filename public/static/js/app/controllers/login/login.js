'use strict';

hotPotatoEngineApp.controller('LoginController', [ '$window', 'AuthService', 'ForgotPasswordService',
    function($window, authService, forgotPasswordService) {
        var loginCtrl = this;
        loginCtrl.login = login;
        loginCtrl.forgotPassword = forgotPassword;

        (function initController() {
            console.log("login controller");
            authService.clearCredentials();
        })();

        function login(credentials) {
            var x = authService.login(credentials).$promise.then(function (res) {
                console.log(res);
                switch(res.status) {
                    case '0':
                    window.location.href = '/sensors';
                        break;
                    case 'Failed':
                        loginCtrl.messages = res.reason;
                        break;
                    case 'Not Found':
                        loginCtrl.messages = res.reason;
                        break;
                    default:
                        loginCtrl.messages = res.reason;
                }
            });
        };

        function forgotPassword(email) {
            var x = forgotPasswordService.forgotPassword(email).$promise.then(function (res) {
                switch(res.status) {
                    case 'Success':
                        break;
                    case 'Failed':
                        loginCtrl.forgotPasswordMessage = res.reason;
                        break;
                    case 'Not Found':
                        loginCtrl.forgotPasswordMessage = res.reason;
                        break;
                    default:
                        loginCtrl.forgotPasswordMessage = res.reason;
                }
            });
        };
    }
]);


$(function() {

    $('#login-form-link').click(function(e) {
		$("#loginform").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#loginform").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

    $('#register-form-link-header').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#loginform").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$('#register-form-link').addClass('active');
		e.preventDefault();
    });

    $('#login-form-link-header').click(function(e) {
		$("#loginform").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$('#login-form-link').addClass('active');
		e.preventDefault();
    });

});
