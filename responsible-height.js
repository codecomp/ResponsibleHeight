$.fn.responsibleHeight = function (options) {

	/* ==========================================================================
	 Setup
	 ========================================================================== */

	var defaults = {
		'widths' : [
			[1300, 10],
			[1000, 8],
			[700, 4],
			[40, 2],
			[0, 1]
		],
		'child' : false,
		'verbose': false
	};
	//Add missing variables to the options object from the defaults
	options  	= $.extend({}, defaults, options);
	//Set self to the elements that this function has been applied to
	var self 	= this;
	var active 	= false;

	//log the options
	if (options.verbose) {
		console.log(options);
	}

	/* ==========================================================================
	 Logic
	 ========================================================================== */

	function resize() {
		//Loop through all our set widths
		for (i = 0; i < options.widths.length; i++) {
			//get the the desired column count
			if( $(window).width() > options.widths[i][0] ){
				if( options.widths[i][1] != 1 ){
					//If one column is required at this resolution reset the heights of all elements
					debug( 'Columns: '+options.widths[i][1] );
					set_height_blocks( options.widths[i][1] );
				} else{
					//re-height the elements
					debug( 'Columns: '+options.widths[i][1] );
					reset_height_block();
				}
				break;
			}
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

	//Returns the element for height calculations
	function get_element( element ){
		//throw new Error("Got to get_element");
		//Check to see if we're finding child elements
		if( options.child != false ){
			return element.find( options.child );
		}
		return element;
	}

	//Loop through elements in a row and sets the heights
	function set_element_heights( row, columns, height ){
		var start = row*columns-columns;
		debug("Row: " + row + " Columns: " + columns + " Height: " + height);
		debug('Setting row heights');

		for (i = 0; i < columns; i++) {
			//Get the element whose height we're setting
			var element = get_element( self.eq( i + start) );
			element.css('height', height + 'px');
		}
	}

	//Loops through elements and sets the heights
	function set_height_blocks( columns ) {
		var row 			= 1;
		var col				= 0;
		var total_columns 	= self.length;
		var height 			= 0;


		self.each(function ( index, element ) {
			debug(index);
			//Fet the element whose size we will be controlling
			var element = get_element( self.eq(index) );
			//Set col to the current column
			col++;
			//Reset the blocks height to read it as its default
			element.css('height', 'auto');
			if (element.outerHeight() > height) {
				height 	= element.outerHeight();
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