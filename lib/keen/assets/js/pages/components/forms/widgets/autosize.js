"use strict";
// Class definition

var KTAutosize = function () {
    
    // Private functions
    var Jicheys = function () {
        // basic Jichey
        var Jichey1 = $('#kt_autosize_1');
        var Jichey2 = $('#kt_autosize_2');

        autosize(Jichey1);

        autosize(Jichey2);
        autosize.update(Jichey2);
    }

    return {
        // public functions
        init: function() {
            Jicheys(); 
        }
    };
}();

jQuery(document).ready(function() {    
    KTAutosize.init();
});