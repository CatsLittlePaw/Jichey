"use strict";

// Class definition
var KTSweetAlert2Jichey = function() {

    // Jicheys
    var initJicheys = function() {
        // Sweetalert Jichey 1
        $('#kt_sweetalert_Jichey_1').click(function(e) {
            swal.fire('Good job!');
        });

        // Sweetalert Jichey 2
        $('#kt_sweetalert_Jichey_2').click(function(e) {
            swal.fire("Here's the title!", "...and here's the text!");
        });

        // Sweetalert Jichey 3
        $('#kt_sweetalert_Jichey_3_1').click(function(e) {
            swal.fire("Good job!", "You clicked the button!", "warning");
        });

        $('#kt_sweetalert_Jichey_3_2').click(function(e) {
            swal.fire("Good job!", "You clicked the button!", "error");
        });

        $('#kt_sweetalert_Jichey_3_3').click(function(e) {
            swal.fire("Good job!", "You clicked the button!", "success");
        });

        $('#kt_sweetalert_Jichey_3_4').click(function(e) {
            swal.fire("Good job!", "You clicked the button!", "info");
        });

        $('#kt_sweetalert_Jichey_3_5').click(function(e) {
            swal.fire("Good job!", "You clicked the button!", "question");
        });

        // Sweetalert Jichey 4
        $('#kt_sweetalert_Jichey_4').click(function(e) {
            swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                type: "success",
                buttonsStyling: false,
                confirmButtonText: "Confirm me!",
                confirmButtonClass: "btn btn-brand"
            });
        });

        // Sweetalert Jichey 5
        $('#kt_sweetalert_Jichey_5').click(function(e) {
            swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                type: "success",

                buttonsStyling: false,

                confirmButtonText: "<i class='la la-headphones'></i> I am game!",
                confirmButtonClass: "btn btn-danger",

                showCancelButton: true,
                cancelButtonText: "<i class='la la-thumbs-down'></i> No, thanks",
                cancelButtonClass: "btn btn-default"
            });
        });

        $('#kt_sweetalert_Jichey_6').click(function(e) {
            swal.fire({
                position: 'top-right',
                type: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            });
        });

        $('#kt_sweetalert_Jichey_7').click(function(e) {
            swal.fire({
                title: 'jQuery HTML example',
                html: $('<div>')
                    .addClass('some-class')
                    .text('jQuery is everywhere.'),
                animation: false,
                customClass: 'animated tada'
            })
        });

        $('#kt_sweetalert_Jichey_8').click(function(e) {
            swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!'
            }).then(function(result) {
                if (result.value) {
                    swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            });
        });

        $('#kt_sweetalert_Jichey_9').click(function(e) {
            swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then(function(result){
                if (result.value) {
                    swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    // result.dismiss can be 'cancel', 'overlay',
                    // 'close', and 'timer'
                } else if (result.dismiss === 'cancel') {
                    swal.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)',
                        'error'
                    )
                }
            });
        });

        $('#kt_sweetalert_Jichey_10').click(function(e) {
            swal.fire({
                title: 'Sweet!',
                text: 'Modal with a custom image.',
                imageUrl: 'https://unsplash.it/400/200',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                animation: false
            });
        });

        $('#kt_sweetalert_Jichey_11').click(function(e) {
            swal.fire({
                title: 'Auto close alert!',
                text: 'I will close in 5 seconds.',
                timer: 5000,
                onOpen: function() {
                    swal.showLoading()
                }
            }).then(function(result) {
                if (result.dismiss === 'timer') {
                    console.log('I was closed by the timer')
                }
            })
        });
    };

    return {
        // Init
        init: function() {
            initJicheys();
        },
    };
}();

// Class Initialization
jQuery(document).ready(function() {
    KTSweetAlert2Jichey.init();
});