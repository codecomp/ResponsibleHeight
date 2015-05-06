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
		'child': 	'p.desc',
    	'verbose': 	true,
		'widths': 	[
			[1300, 10],
			[1000, 8],
			[700, 4],
			[40, 2],
			[0, 1]
		]
	});
});
```

## Settings

Option  | Default | Details
------------- | ------------- | -------------
delay *(int)*  | 200 | Delay between resize of the screen and the recalculation of the required heights. This can be set to 0 and no delay will be calculated.
child *(string)*  | false | Selector for the child element to be found inside the main selector. If this is set the height will be calculated and set to this element instead of the parent. However the parent will be used for calculating columns.
global *(boolean)* | false | If global is set to true it will ignore the widths option and set all elements (or their children) to the same height.
exclude_get *(selector)* | false | Setting Exclude get with either a string or a jQuery selector will stop the elements with this selector from having their heights factor into the heights of the other elements in its row.
exclude_set *(selector)* | false | Setting Exclude set with either a string or a jQuery selector will stop the element (or child element if specified) from having its height set.
widths *(array)* | empty Array | A multi dimensional array of pixel widths and columns starting from the heights to lowest. This checks if the size is greater than a size, if so it sets the columns.
verbose *(boolean)* | false | Set this to true to log debugging information to console.

## Contributing

Why would you?

## History

TODO: Write history

## Credits

TODO: Write credits

## License

The MIT License (MIT)

Copyright (c) 2014 Chris Morris

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
