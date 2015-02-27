$.fn.responsibleHeight = function (options) {

	/* ==========================================================================
	 Setup
	 ========================================================================== */

	var defaults = {
		'mobileWidth' : 400,
		'verbose': false
	};
	options  = $.extend({}, defaults, options); //Add missing variables to the options object from the defaults
	var self = this;

	if (options.verbose) {
		console.log(options);
	}

	/* ==========================================================================
	 Logic
	 ========================================================================== */

	function resize() {
		if ($(window).width() < options.mobileWidth) {
			reset_height_block();
		} else {
			even_height_element();
		}
	}

	// Setup resize on window resize
	$(window).resize(function () {
		resize();
	});

	//run the resize once upon creation
	resize();

	/* ==========================================================================
	 Functions
	 ========================================================================== */

	function debug(message){
		if (options.verbose) {
			console.log(message);
		}
	}
	function even_height_element() {
		var max_height = 0;

		self.each(function () {
			$(this).css('height', 'auto');
			if ($(this).outerHeight() > max_height) {
				max_height = $(this).outerHeight();
			}
		});
		self.css('height', max_height + 'px');
	}

	function reset_height_block() {
		self.css('height', 'auto');
	}

};