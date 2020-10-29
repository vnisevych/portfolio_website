(function($) {
	$(document).ready(function () {
		console.log('dom is ready');

		$('.col-md-4').on( 'click', (function() {
			$('#wrapper').toggleClass('gallery');
			console.log('ive changed my color');
		}));

		$('#btnBack').on( 'click', (function() {
			$('#wrapper').toggleClass('gallery');
			console.log('I pushed the btn')
		}));

		


	});

})(jQuery);