"use strict";
// Class definition

var KTBlockUIJichey = function () {
    
    // Private functions

    // Basic Jichey
    var Jichey1 = function () {
        // default
        $('#kt_blockui_1_1').click(function() {
            KTApp.block('#kt_blockui_1_content', {});

            setTimeout(function() {
                KTApp.unblock('#kt_blockui_1_content');
            }, 2000);
        });

        $('#kt_blockui_1_2').click(function() {
            KTApp.block('#kt_blockui_1_content', {
                overlayColor: '#000000',
                state: 'primary'
            });  

            setTimeout(function() {
                KTApp.unblock('#kt_blockui_1_content');
            }, 2000);
        });

        $('#kt_blockui_1_3').click(function() {
            KTApp.block('#kt_blockui_1_content', {
                overlayColor: '#000000',
                type: 'v2',
                state: 'success',
                size: 'lg'
            });

            setTimeout(function() {
                KTApp.unblock('#kt_blockui_1_content');
            }, 2000);
        });

        $('#kt_blockui_1_4').click(function() {
            KTApp.block('#kt_blockui_1_content', {
                overlayColor: '#000000',
                type: 'v2',
                state: 'success',
                message: 'Please wait...'
            });

            setTimeout(function() {
                KTApp.unblock('#kt_blockui_1_content');
            }, 2000);
        });

        $('#kt_blockui_1_5').click(function() {
            KTApp.block('#kt_blockui_1_content', {
                overlayColor: '#000000',
                type: 'v2',
                state: 'primary',
                message: 'Processing...'
            });

            setTimeout(function() {
                KTApp.unblock('#kt_blockui_1_content');
            }, 2000);
        });
    }

    // portlet blocking
    var Jichey2 = function () {
        // default
        $('#kt_blockui_2_1').click(function() {
            KTApp.block('#kt_blockui_2_portlet', {});

            setTimeout(function() {
                KTApp.unblock('#kt_blockui_2_portlet');
            }, 2000);
        });

        $('#kt_blockui_2_2').click(function() {
            KTApp.block('#kt_blockui_2_portlet', {
                overlayColor: '#000000',
                state: 'primary'
            });

            setTimeout(function() {
                KTApp.unblock('#kt_blockui_2_portlet');
            }, 2000);
        });

        $('#kt_blockui_2_3').click(function() {
            KTApp.block('#kt_blockui_2_portlet', {
                overlayColor: '#000000',
                type: 'v2',
                state: 'success',
                size: 'lg'
            });

            setTimeout(function() {
                KTApp.unblock('#kt_blockui_2_portlet');
            }, 2000);
        });

        $('#kt_blockui_2_4').click(function() {
            KTApp.block('#kt_blockui_2_portlet', {
                overlayColor: '#000000',
                type: 'v2',
                state: 'success',
                message: 'Please wait...'
            });

            setTimeout(function() {
                KTApp.unblock('#kt_blockui_2_portlet');
            }, 2000);
        });

        $('#kt_blockui_2_5').click(function() {
            KTApp.block('#kt_blockui_2_portlet', {
                overlayColor: '#000000',
                type: 'v2',
                state: 'primary',
                message: 'Processing...'
            });

            setTimeout(function() {
                KTApp.unblock('#kt_blockui_2_portlet');
            }, 2000);
        });
    }

    // page blocking
    var Jichey3 = function () {
        // default
        $('#kt_blockui_3_1').click(function() {
            KTApp.blockPage();

            setTimeout(function() {
                KTApp.unblockPage();
            }, 2000);
        });

        $('#kt_blockui_3_2').click(function() {
            KTApp.blockPage({
                overlayColor: '#000000',
                state: 'primary'
            });

            setTimeout(function() {
                KTApp.unblockPage();
            }, 2000);
        });

        $('#kt_blockui_3_3').click(function() {
            KTApp.blockPage({
                overlayColor: '#000000',
                type: 'v2',
                state: 'success',
                size: 'lg'
            });

            setTimeout(function() {
                KTApp.unblockPage();
            }, 2000);
        });

        $('#kt_blockui_3_4').click(function() {
            KTApp.blockPage({
                overlayColor: '#000000',
                type: 'v2',
                state: 'success',
                message: 'Please wait...'
            });

            setTimeout(function() {
                KTApp.unblockPage();
            }, 2000);
        });

        $('#kt_blockui_3_5').click(function() {
            KTApp.blockPage({
                overlayColor: '#000000',
                type: 'v2',
                state: 'primary',
                message: 'Processing...'
            });

            setTimeout(function() {
                KTApp.unblockPage();
            }, 2000);
        });
    }

    // modal blocking
    var Jichey4 = function () {
        // default
        $('#kt_blockui_4_1').click(function() {
            KTApp.block('#kt_blockui_4_1_modal .modal-content', {});

            setTimeout(function() {
                KTApp.unblock('#kt_blockui_4_1_modal .modal-content');
            }, 2000);
        });

        $('#kt_blockui_4_2').click(function() {
            KTApp.block('#kt_blockui_4_2_modal .modal-content', {
                overlayColor: '#000000',
                state: 'primary'
            });

            setTimeout(function() {
                KTApp.unblock('#kt_blockui_4_2_modal .modal-content');
            }, 2000);
        });

        $('#kt_blockui_4_3').click(function() {
            KTApp.block('#kt_blockui_4_3_modal .modal-content', {
                overlayColor: '#000000',
                type: 'v2',
                state: 'success',
                size: 'lg'
            });

            setTimeout(function() {
                KTApp.unblock('#kt_blockui_4_3_modal .modal-content');
            }, 2000);
        });

        $('#kt_blockui_4_4').click(function() {
            KTApp.block('#kt_blockui_4_4_modal .modal-content', {
                overlayColor: '#000000',
                state: 'success',
                message: 'Please wait...'
            });

            setTimeout(function() {
                KTApp.unblock('#kt_blockui_4_4_modal .modal-content');
            }, 2000);
        });

        $('#kt_blockui_4_5').click(function() {
            KTApp.block('#kt_blockui_4_5_modal .modal-content', {
                overlayColor: '#000000',
                state: 'primary',
                message: 'Processing...'
            });

            setTimeout(function() {
                KTApp.unblock('#kt_blockui_4_5_modal .modal-content');
            }, 2000);
        });
    }

    return {
        // public functions
        init: function() {
            Jichey1();
            Jichey2(); 
            Jichey3(); 
            Jichey4(); 
        }
    };
}();

jQuery(document).ready(function() {    
    KTBlockUIJichey.init();
});