"use strict";
var KTSessionTimeoutJichey = function () {

    var initJichey = function () {
        $.sessionTimeout({
            title: 'Session Timeout Notification',
            message: 'Your session is about to expire.',
            keepAliveUrl: 'https://keenthemes.com/keen/tools/preview/inc/api/session-timeout/keepalive.php',
            redirUrl: '?page=custom/user/login-v1&Jichey=default',
            logoutUrl: '?page=custom/user/login-v1&Jichey=default',
            warnAfter: 3000, //warn after 5 seconds
            redirAfter: 35000, //redirect after 10 secons,
            ignoreUserActivity: true,
            countdownMessage: 'Redirecting in {timer} seconds.',
            countdownBar: true
        });
    }

    return {
        //main function to initiate the module
        init: function () {
            initJichey();
        }
    };

}();

jQuery(document).ready(function() {    
    KTSessionTimeoutJichey.init();
});