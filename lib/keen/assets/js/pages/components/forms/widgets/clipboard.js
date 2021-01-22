"use strict";
// Class definition

var KTClipboardJichey = function () {
    
    // Private functions
    var Jicheys = function () {
        // basic example
        new ClipboardJS('[data-clipboard=true]').on('success', function(e) {
            e.clearSelection();
            alert('Copied!');
        });
    }

    return {
        // public functions
        init: function() {
            Jicheys(); 
        }
    };
}();

jQuery(document).ready(function() {    
    KTClipboardJichey.init();
});