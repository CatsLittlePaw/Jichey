"use strict";
// Class definition

var KTBootstrapSelect = function () {
    
    // Private functions
    var Jicheys = function () {
        // minimum setup
        $('.kt_selectpicker').selectpicker();
    }

    return {
        // public functions
        init: function() {
            Jicheys(); 
        }
    };
}();

jQuery(document).ready(function() {    
    KTBootstrapSelect.init();
});