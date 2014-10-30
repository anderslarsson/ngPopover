ngPopover
=========

Popover provider for [Angular.js](http://angularjs.org/) applications.

## Install

You can download all necessary ngPopover files manually or install it with bower:

```bash
bower install ngPopover
```
## Usage

You need only to include ``ngPopover.js`` and  ``ngPopover.css`` (as minimal setup) to your project and then you can start using ``ngPopover`` provider in your directives, controllers and services. For example in controllers:

```javascript
var app = angular.module('exampleApp', ['ngPopover']);

app.controller('MainCtrl', function ($scope, ngPopover) {
	$scope.clickToOpen = function () {
		ngPopover.open({ template: 'popoverTmpl.html' });
	};
});
```
## Directive

By default ngPopover module is served with ``ngPopover`` directive which can be used as attribute for buttons, links, etc. All ``.open()`` options are available through tag attributes as well.

Some button, for example, will look like:

```html
<button type="button"
	ng-popover="templateId.html"
	title="Popover title"
	placement="right"
	maximize="true"
	Open popover text
</button>
```

## API

ngPopover service provides easy to use API. Here is the list of accessible methods that you can use:

### ``.open(options)``

Method opens the popover. It accepts ``options`` object as the only argument.

##### Options:

##### ``template {String}``

Popover template can be loaded through ``<script>`` tag with ``text/ng-template``.

##### ``title {String}``

Popover optional title (and title bar with close button). If not present no title bar will be shown.

##### ``placement {String}``

Popover placement can be [ top | bottom | left | right]. Default value is ``bottom``.

##### ``useparentwidth {Boolean}``

When set to true, popover width will be set to same width as containing element. 

##### ``anchorselector {String}``

Popover will target arrow towards the dom element within the containing element with this selector (jquery).  

##### ``maxwidth {Number}``

Popover will get this max width.   

##### ``maximize {Boolean}``

When set to true, popover width will be changed to width of small screens < 500px. 

##### ``margin {Number}``

Used together with maximize the popover will get a margin with this amount of pixels. 

##### ``overlayClasses [string]``

Add a list of classes which will be overlays to popovers and clicks in them should not close the popover. 

```html
<script type="text/ng-template" id="templateId">
	<h1>Template heading</h1>
	<p>Content goes here</p>
</script>
```

```javascript
ngPopover.open({ 
	template: 'templateId',
	title: 'Popover title', 
	placement: 'top' 
});

```
### ``.close()``

Method closes the currently open popover.

### ``.setup(options)``

Setup global parameters for the popover.

##### Options:

##### ``smallScreenBreakpoint {Number}``

Sets the breakpoint in pixels where the maximize option will kick in.

##### ``maximizeMargin {Number}``

Margin to add when showing popover maximized in width.

## Licence

MIT Licensed

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

