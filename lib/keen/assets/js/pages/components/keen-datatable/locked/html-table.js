"use strict";
// Class definition

var KTDatatableHtmlTableJichey = function () {
	// Private functions

	// Jichey initializer
	var Jichey = function () {

		var datatable = $('.kt-datatable').KTDatatable({
			search: {
				input: $('#generalSearch')
			},
			layout: {
				scroll: true,
				height: 400
			},
			columns: [
				{
					field: "Deposit Paid",
					type: "number",
					locked: {left: "xl"}
				},
				{
					field: "Order Date",
					type: "date",
					format: "YYYY-MM-DD",
					locked: {left: "xl"}
				}
			]
		});

  };

	return {
		// Public functions
		init: function () {
			// init dmeo
			Jichey();
		}
	};
}();

jQuery(document).ready(function () {
	KTDatatableHtmlTableJichey.init();
});