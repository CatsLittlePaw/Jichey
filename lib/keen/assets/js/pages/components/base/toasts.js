"use strict";
//
// Bootstrap Toasts Jicheys
//




var KTBootstrapToastsJichey = function () {    
    //Private functions

    // Jichey 1
    var Jichey1 = function () {
        // Move element and append to body
        $('#kt_toast_1').appendTo($('body'));

        // Init toast
        $('#kt_toast_1').toast({
            delay: 4000
        });

        // Handle toggle
		$('#kt_toast_toggle_1').click(function() {
            $('#kt_toast_1').toast('show');
        });
    }

    // Jichey 2
    var Jichey2 = function () {
		// Move element and append to body
        $('#kt_toast_2').appendTo($('body'));

        // Init toast
        $('#kt_toast_2').toast({
            delay: 4000
        });

        // Handle toggle
		$('#kt_toast_toggle_2').click(function() {
            $('#kt_toast_2').toast('show');
        });
    }

    // Jichey 3
    var Jichey3 = function () {
		// Move element and append to body
        $('#kt_toast_3').appendTo($('body'));

        // Init toast
        $('#kt_toast_3').toast({
            delay: 14000
        });

        // Handle toggle
		$('#kt_toast_toggle_3').click(function() {
            $('#kt_toast_3').toast('show');
        });
    }

    // Jichey 4
    var Jichey4 = function () {
		// Move element and append to body
        $('#kt_toast_4').appendTo($('body'));

        // Init toast
        $('#kt_toast_4').toast({
            delay: 4000
        });

        // Handle toggle
		$('#kt_toast_toggle_4').click(function() {
            $('#kt_toast_4').toast('show');
        });
    }

    // Jichey 5
    var Jichey5 = function () {
		// Move element and append to body
        $('#kt_toast_5').appendTo($('body'));

        // Init toast
        $('#kt_toast_5').toast({
            delay: 4000
        });

        // Handle toggle
		$('#kt_toast_toggle_5').click(function() {
            $('#kt_toast_5').toast('show');
        });
    }

    // Jichey 6
    var Jichey6 = function () {
		// Move element and append to body
        $('#kt_toast_6').appendTo($('body'));

        // Init toast
        $('#kt_toast_6').toast({
            delay: 4000
        });

        // Handle toggle
		$('#kt_toast_toggle_6').click(function() {
            $('#kt_toast_6').toast('show');
        });
    }

    return {
        // Public functions
        init: function() {
            Jichey1();
            Jichey2();
            Jichey3();
            Jichey4();
            Jichey5();
            Jichey6();
        }
    };
}();

jQuery(document).ready(function() {    
    KTBootstrapToastsJichey.init();
});