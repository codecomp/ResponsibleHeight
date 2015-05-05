# ResponsibleHeight
jQuery plugin to evenly height elements responsively in changing numbers of columns

## Installation

1. Download to your machine
2. Download a copy of jQuery
3. Include jQuery and ResponsibleHeight in your project
4. Enjoy

## Example Usage
```javascript
jQuery(document).ready(function( $ ) {
	$('.item').responsibleHeight({
		'widths': [
			[1300, 10],
			[1000, 8],
			[700, 4],
			[40, 2],
			[0, 1]
		],
		'child': 'p',
		'verbose' : true
	});
});
```

## Settings

Option  | Use
------------- | -------------
Delay *(int)*  | Delay between resize of the screen and the recalculaiton of the required heights. This can be set to 0 and no delay will be calculated
Child *(string)*  | Selector for the child element to be found inside the main selector. If this is set the height will be calculated and set to this element instead of the parent. However the parent will be used for calculating columns.
Widths *(array)* | A multi dimensional array of pixel widths and columns starting from the heights to lowest. This checks if the size is greater than a size, if so it sets the columns.
Verbose *(boolean)* | Set this to true to log debugging information to cosole

## Contributing

Why would you?

## History

TODO: Write history

## Credits

TODO: Write credits

## License

TODO: Write license
