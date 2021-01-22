"use strict";
// Class definition

var KTSummernoteJichey = function () {    
    // Private functions
    var Jicheys = function () {
        $('.summernote').summernote({
            height: 150
        });
    }

    return {
        // public functions
        init: function() {
            Jicheys(); 
        }
    };
}();

// Initialization
jQuery(document).ready(function() {
    KTSummernoteJichey.init();
});