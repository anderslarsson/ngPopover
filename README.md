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
		ngPopover.popover({ template: 'popoverTmpl.html' });
	};
});
```

