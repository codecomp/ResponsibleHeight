# ResponsibleHeight
jQuery plugin to evenly height elements responsively in ever changing numbers of columns

## Installation

1. Download to your machine
2. Download a copy of jQuery
3. Include jQuery and ResponsibleHeight in your project
4. Enjoy

## Example Usage

Here you can see how a simple call for this function runs. This will set the heights of every Paragraph with a desc class found inside every element with the item class.
```javascript
jQuery(document).ready(function( $ ) {
	$('.item').responsibleHeight({
		child: 		'p.desc',
    	verbose: 	true,
		widths: 	[
			[1300, 10],
			[1000, 8],
			[700, 4],
			[40, 2],
			[0, 1]
		]
	});
});
```

You can also set the globals for the plugin in the following way
```javascript
...
$.fn.responsibleHeight.defaults.verbose = true; //Make all instances verbose
$.fn.responsibleHeight.defaults.delay = 0; //Remove delay from all instances
...
```

The plugin also now contains the ability to call methods which can be done in the following way
```javascript
...
$('.item').responsibleHeight('destroy'); //Remove height and stop further resizing
...
```

You can now pass callback functions as follows
```javascript
jQuery(document).ready(function( $ ) {
	$('.item').responsibleHeight({
		...
		after_resize: function( element ){
			alert('Resize completed');
		}
		...
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
before_init *(function)* | null | Callback function called before initialisation.
after_init *(function)* | null | Callback function called after initialisation has finished.
window_resize *(function)* | null | Callback function called once when window resize is detected and will not fire until resize has completed and window is resided again.
before_resize *(function)* | null | Callback function called before resize starts.
after_resize *(function)* | null | Callback function called after resize has finished.
after_destroy *(function)* | null | Callback function called after destroy method is called.

## Methods

Method | Details
------------- | -------------
refresh | Immediately trigger a recalculation of the heights for all elements  based off the existing settings 
destroy | Removes the heights off all elements or their children and stops further processing
reinit | Re initialises the plugin causing an immediate refresh and re binding the resizing of the window to trigger further refreshes

## Roadmap

Add settings update method
Add varying levels to verbose to avoid cluttering console log

## History

###?.?.?
This started off as a very rough little function for a single website.
It's only job was to resize some columns to be the same height with little regard for responsiveness.

###1.0.0
The Plugin was created from the rough functions and rebuilt from the ground up as a jQuery plugin, given options and was trialed with great success on multiple websites with as of yet little to no issues.

Over time a couple of more useful options were added, such as a global option to set heights regardless of width and the exclusion options.

###1.1.0
A second update of the plugin lead the the framework being completely reworked.

This update was to allow for the creation and use of method calls to the plugin along with a couple of major bug fixes to the plugin that had previously gone un notices. Despite the complete reworking of the framework the plugin remains completely compatible with existing websites.

###1.2.0
Call back functionality added to plugin.

Call back options added:
before_init, after_init, window_resize, before_resize, after_resize, after_destroy

## Credits

Chris morris [http://codecomposer.co.uk]

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
