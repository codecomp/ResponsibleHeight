(function( $ ){

	/* ==========================================================================
		 Global Variables
	 ========================================================================== */

	var opts; //Setup global option
	var resizeId = setTimeout(function(){}, 100); //Setup empty timeout
	var self; //Setup global to contain element plugin is called on
	var pending = false; //Setup global to handle first check for resize

	/* ==========================================================================
		Methods
	 ========================================================================== */

	var methods = {
		init : function(options) {

			//Extend our default options with those provided.
			//Note that the first argument to extend is an empty
			//object – this is to keep from overriding our "defaults" object.
			opts = $.extend( {}, $.fn.responsibleHeight.defaults, options );

			//Fire the before_init callback
			$.isFunction( opts.before_init ) && opts.before_init.call( this );

			//log the options
			debug(opts);

			//Break if we don't know what to do
			if ( (typeof opts.widths == 'undefined' || opts.widths.length === 0) && !opts.global ) {
				$.error( 'widths or global opts missing' );
				return false;
			}

			//Setup resize on window resize
			$(window).on('resize', window_resize);

			//run the resize once upon creation
			resize();

			//Fire the after_init callback
			$.isFunction( opts.after_init ) && opts.after_init.call( this );
		},
		reinit : function() {
			methods.init(opts);
		},
		refresh : function() {
			resize();
		},
		destroy : function() {
			debug('Destroying...');
			debug( self );

			//Clear the timeout
			clearTimeout(resizeId);

			//Stop recalling on resize
			$(window).off("resize", window_resize);

			//Remove forced heights on elements
			reset_height_block();

			//Fire the after_destroy callback
			$.isFunction( opts.after_destroy ) && opts.after_destroy.call( this );
		}
	};

	/* ==========================================================================
	 	Plugin definition
	 ========================================================================== */

	$.fn.responsibleHeight = function(methodOrOptions) {
		//Set self to the elements that this function has been applied to
		self 	= this;

		//Run method or init function
		if ( methods[methodOrOptions] ) {
			return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
			//Default to "init"
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  methodOrOptions + ' does not exist on responsibleHeight' );
		}
	};

	/* ==========================================================================
		 Defaults
	 ========================================================================== */

	$.fn.responsibleHeight.defaults = {
		global:			false,
		delay: 			200,
		widths: 		[],
		child: 			false,
		verbose: 		false,
		exclude_get: 	false,
		exclude_set: 	false,
		before_init:	null,
		after_init:		null,
		window_resize:	null,
		before_resize:	null,
		after_resize:	null,
		after_destroy:	null
	};

	/* ==========================================================================
		 Functions
	 ========================================================================== */

	function window_resize() {

		if( pending == false ){
			debug('trying to resize');

			//Stop window resize from repeatedly firing callback
			pending = true;

			//Fire the window_resize callback
			$.isFunction( opts.window_resize ) && opts.window_resize.call( this );
		}

		if( opts.delay === 0 ){
			//If the user chooses run resize function constantly during resize
			resize();
		} else {
			//Only run the plugin options delay milliseconds after the resize has been last called
			clearTimeout(resizeId);
			resizeId = setTimeout(function () {
				resize();
			}, opts.delay);
		}
	}

	function resize() {
		//Fire the before_resize callback
		$.isFunction( opts.before_resize ) && opts.before_resize.call( this );

		//Allow window_resize callback to fire again
		pending = false;

		//If we are not using columns resize al elements globally
		if(opts.global){
			debug( 'Globally resizing' );
			set_height_blocks( 999999 );
			return;
		}

		//Loop through all our set widths
		for (var i = 0; i < opts.widths.length; i++) {
			//get the the desired column count
			if( window_check(opts.widths[i][0])  ){
				if( opts.widths[i][1] != 1 ){
					//If we are doing anything but one column run the logic
					debug( 'Columns: '+opts.widths[i][1] );
					set_height_blocks( opts.widths[i][1] );
				} else{
					//If one column is needed reset the heights of all blocks
					debug( 'Columns: '+opts.widths[i][1] );
					reset_height_block();
				}
				break;
			}
		}

		//Fire the after_resize callback
		$.isFunction( opts.after_resize ) && opts.after_resize.call( this );
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
		if( opts.child !== false ){
			return element.find( opts.child );
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
			if( opts.exclude_set && element.is(opts.exclude_set) ){
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
			if( opts.exclude_get && element.is(opts.exclude_get) ){
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
		//TODO logic for exclude_set

		if(opts.child){
			self.find(opts.child).css('height', 'auto');
		} else {
			self.css('height', 'auto');
		}
	}

	function debug( message ){
		if( opts.verbose )
			console.log( message )
	}

})( jQuery );