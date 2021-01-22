"use strict";
//
// Bootstrap Tooltips Jichey
//




var KTBootstrapTooltipsJichey = function () {    
    //Private functions

    // Jichey 1
    var Jichey1 = function () {
		$('[data-toggle="tooltip"]').tooltip();
    }

    return {
        // Public functions
        init: function() {
            Jichey1();
        }
    };
}();

jQuery(document).ready(function() {    
    KTBootstrapTooltipsJichey.init();
});