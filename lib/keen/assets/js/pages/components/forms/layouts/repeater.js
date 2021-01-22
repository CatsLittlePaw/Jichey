
"use strict";
// Class definition

var KTRepeaterJichey = function () {
    
    // Private functions
    var Jichey = function () {
        $('.kt-repeater').each(function(){
            $(this).repeater({
                show: function () {
                    $(this).slideDown();
                },
                // Enable the option below to have a 2-step remove button
                /*
                hide: function (deleteElement) {
                    if(confirm('Are you sure you want to delete this element?')) {
                        $(this).slideUp(deleteElement);
                    }
                },
                */
                isFirstItemUndeletable: true
            });
        });
    }

    return {
        // public functions
        init: function() {
            Jichey(); 
        }
    };
}();

jQuery(document).ready(function() {    
    KTRepeaterJichey.init();
});