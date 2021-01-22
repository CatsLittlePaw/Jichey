"use strict";
// Class definition

var KTCkeditor = function () {    
    // Private functions
    var Jicheys = function () {
        ClassicEditor
			.create( document.querySelector( '#kt-ckeditor-1' ) )
			.then( editor => {
				console.log( editor );
			} )
			.catch( error => {
				console.error( error );
			} );

		ClassicEditor
			.create( document.querySelector( '#kt-ckeditor-2' ) )
			.then( editor => {
				console.log( editor );
			} )
			.catch( error => {
				console.error( error );
			} );

		ClassicEditor
			.create( document.querySelector( '#kt-ckeditor-3' ) )
			.then( editor => {
				console.log( editor );
			} )
			.catch( error => {
				console.error( error );
			} );

		ClassicEditor
			.create( document.querySelector( '#kt-ckeditor-4' ) )
			.then( editor => {
				console.log( editor );
			} )
			.catch( error => {
				console.error( error );
			} );

		ClassicEditor
			.create( document.querySelector( '#kt-ckeditor-5' ) )
			.then( editor => {
				console.log( editor );
			} )
			.catch( error => {
				console.error( error );
			} );
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
    KTCkeditor.init();
});