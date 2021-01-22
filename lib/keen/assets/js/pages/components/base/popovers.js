"use strict";
//
// Bootstrap Popovers Jichey
//




var KTBootstrapPopoversJichey = function () {    
    //Private functions

    // Jichey 1
    var Jichey1 = function () {
		$('[data-toggle="popover"]').popover()
    }

    return {
        // Public functions
        init: function() {
            Jichey1();
        }
    };
}();

jQuery(document).ready(function() {    
    KTBootstrapPopoversJichey.init();
});