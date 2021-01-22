"use strict";
// Class definition

var KTBootstrapMultipleSelectsplitter = function () {
    
    // Private functions
    var Jicheys = function () {
        // minimum setup
        $('#kt_multipleselectsplitter_1, #kt_multipleselectsplitter_2').multiselectsplitter();
    }

    return {
        // public functions
        init: function() {
            Jicheys(); 
        }
    };
}();

jQuery(document).ready(function() {    
    KTBootstrapMultipleSelectsplitter.init();
});