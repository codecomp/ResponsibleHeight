(function($){
	$.fn.responsibleHeight = function (options) {

		/* ==========================================================================
		 Setup
		 ========================================================================== */

		var defaults = {
			'global':		false,
			'delay': 		200,
			'widths': 		[],
			'child': 		false,
			'verbose': 		false,
			'exclude_get': 	false,
			'exclude_set': 	false
		};

		//Add missing variables to the options object from the defaults
		options  	= $.extend({}, defaults, options);
		//Set self to the elements that this function has been applied to
		var self 	= this;
		//Setup empty timeout
		var resizeId = setTimeout(function(){}, 100);

		//log the options
		if (options.verbose) {
			console.log(options);
		}

		/* ==========================================================================
		 Logic
		 ========================================================================== */

		if (typeof options.widths == 'undefined' || options.widths.length === 0) {
			debug('Widths options missing');
			return false;
		}

		function resize() {
			//If we are not using columns resize al elements globally
			if(options.global){
				debug( 'Globally resizing' );
				set_height_blocks( 999999 );
				return;
			}

			//Loop through all our set widths
			for (var i = 0; i < options.widths.length; i++) {
				//get the the desired column count
				if( window_check(options.widths[i][0])  ){
					if( options.widths[i][1] != 1 ){
						//If we are doing anything but one column run the logic
						debug( 'Columns: '+options.widths[i][1] );
						set_height_blocks( options.widths[i][1] );
					} else{
						//If one column is needed reset the heights of all blocks
						debug( 'Columns: '+options.widths[i][1] );
						reset_height_block();
					}
					break;
				}
			}
		}

		// Setup resize on window resize
		$(window).resize(function () {
			if( options.delay === 0 ){
				//If the user chooses run resize function constantly during resize
				resize();
			} else {
				//Only run the plugin options delay milliseconds after the resize has been last called
				clearTimeout(resizeId);
				resizeId = setTimeout(function(){
					resize();
				}, options.delay);
			}
		});

		//run the resize once upon creation
		$(window).on('load', resize);

		/* ==========================================================================
		 Functions
		 ========================================================================== */

		if (typeof options.widths == 'undefined' || options.widths.length === 0) {
			debug('Widths option not set');
			return false;
		}

		//Check to see if the window is larger than the css media query size
		function window_check(size){

			//Check the media query size
			if (window.matchMedia) {
				var mql = window.matchMedia('screen and (min-width: '+size+'px)');

				//Return the result of the match
				return mql.matches;
			}

			//TODO Test this statement bock
			//Check if Modernizr is installed
			if (typeof Modernizr !== 'undefined') {
				//Check to see if mq mthod exists
				if (typeof Modernizr.mq !== 'undefined') {

					//Return the result of the match
					return Modernizr.mq('(min-width: '+size+'px)');
				}
			}

			//If we have no support get close with jQuery
			if( $(window).width() > size ){
				return true;
			} else {
				return false;
			}

		}

		//Returns the element for height calculations
		function get_element( element ){
			//Check to see if we're finding child elements
			if( options.child !== false ){
				return element.find( options.child );
			}
			return element;
		}

		//Loop through elements in a row and sets the heights
		function set_element_heights( row, columns, height ){
			var start = row*columns-columns;
			debug("Row: " + row + " Columns: " + columns + " Height: " + height);
			debug('Setting row heights');

			for (var i = 0; i < columns; i++) {
				//Get the current iteration
				var element = self.eq( i + start);

				//Check to see if we need to skip setting this elements height
				if( options.exclude_set && element.is(options.exclude_set) ){
					continue;
				}

				//Get the element whose height we're setting
				var target = get_element( element );
				target.css('height', height + 'px');
			}
		}

		//Loops through elements and sets the heights
		function set_height_blocks( columns ) {
			var row 			= 1;
			var col				= 0;
			var total_columns 	= self.length;
			var height 			= 0;


			self.each(function ( index ) {
				debug(index);

				//Get the current iteration
				var element = $(this);

				//Check to see if we need to skip getting this elements height
				if( options.exclude_get && element.is(options.exclude_get) ){
					return;
				}

				//Get the element whose size we will be controlling
				var target = get_element( element );
				//Set col to the current column
				col++;
				//Reset the blocks height to read it as its default
				target.css('height', 'auto');
				if (target.outerHeight() > height) {
					height 	= target.outerHeight();
				}
				//if we've reached the end of a column
				if( col == columns || (index+1) == total_columns){
					//Set the element heights for this row
					set_element_heights( row, columns, height );

					row++;
					col 	= 0;
					height 	= 0;
				}
			});
		}

		//Resets the height of all elements
		function reset_height_block() {
			self.css('height', 'auto');
		}

		//Debug function to log to console
		function debug(message){
			if (options.verbose) {
				console.log(message);
			}
		}

	};
})(jQuery);