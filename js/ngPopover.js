var module = angular.module('ngPopover', []);

module.provider('ngPopover', function () {

	var open = false;
	var smallScreenBreakpoint = 500;
	var maximizeMargin = 0;
	var currentTarget;
	var margin = 15;
	var overlayClasses = [];
	

	$(document).on('click', function (e) {
		if (open) {
			var inOverlay = overlayClasses.some(function(cls) {
				return $(cls).has(e.target).length != 0;
			});
			if (!$('#ng-popover').is(e.target) && $('#ng-popover').has(e.target).length == 0 && !inOverlay) {

				var fadeOutTime = 200;
				var target = $(e.target);

				if (target.attr('ng-popover') || target.parents(['ng-popover'])){
					fadeOutTime = 0;
				}
				
				$('#ng-popover').fadeOut(fadeOutTime, function() {
					$(this).remove();
					open = false;

					if (currentTarget != e.target && (target.attr('ng-popover') || target.parents(['ng-popover']))) {
						target.trigger('click');
					}
				});
			}
		}
	});



	var calcPosition = function(element, placement, maximize, useParentWidth, anchorSelector, maxWidth) {

		var elementPosition = $(element).offset();
		var elementWidth = $(element).outerWidth();
		var elementHeight = $(element).outerHeight();
		var popoverWidth = $('#ng-popover').outerWidth();
		var popoverHeight = $('#ng-popover').outerHeight();
		var windowWidth = $(window).width();

		if (maxWidth) {
			$('#ng-popover').css({
				maxWidth: +maxWidth
			});
			popoverWidth = $('#ng-popover').outerWidth();		
		}

		if (useParentWidth) {
			popoverWidth = elementWidth;
			$('#ng-popover').css({
				width: popoverWidth
			});
		}

		var win = $(window);
		var viewport = {
			top : win.scrollTop(),
			left : win.scrollLeft()
		};
		viewport.right = viewport.left + win.width();
		viewport.bottom = viewport.top + win.height();

		var pos;
		if (placement === 'left') {
			pos = {
				left: elementPosition.left - popoverWidth, 
				top: elementPosition.top + elementHeight/2 - popoverHeight / 2 
			};	
		}
		if (placement === 'right') {
			pos = {
				left: elementPosition.left + elementWidth, 
				top: elementPosition.top + elementHeight/2 - popoverHeight / 2	
			};			
		}
		if (placement === 'bottom') {
			pos = {
				left: elementPosition.left + elementWidth/2 - popoverWidth / 2, 
				top: elementPosition.top + elementHeight	
			};			
		}
		if (placement === 'top') {
			pos = {
				left: elementPosition.left - popoverWidth / 2, 
				top: elementPosition.top - popoverHeight	
			};			
		}

		if (placement === 'left' || placement === 'right') {
			var adjustedTop = 0;
			if (pos.top + popoverHeight > viewport.bottom || pos.top < viewport.top) {
				adjustedTop = Math.min(pos.top, pos.top + popoverHeight - viewport.bottom);
				pos.top -= adjustedTop;

				$('#ng-popover .arrow').css({
					top: adjustedTop + popoverHeight / 2
				});
			}
		}

		if (placement === 'bottom' || placement === 'top') {
			var adjustedLeft = 0;
			if (pos.left + popoverWidth > viewport.right) {
				adjustedLeft = Math.min(pos.left, pos.left + popoverWidth - viewport.right);
				pos.left -= (adjustedLeft + margin);

				$('#ng-popover .arrow').css({
					left: adjustedLeft + margin + popoverWidth / 2
				});
			}
			else if(pos.left < viewport.left) {
				var adjustedLeft = pos.left;
				pos.left = viewport.left + margin;

				$('#ng-popover .arrow').css({
					left: adjustedLeft - margin + popoverWidth / 2
				});
			}
		}

		if (anchorSelector) {
			var $anchor = $(element).find(anchorSelector);
			anchorPosition = $anchor.offset();
			anchorWidth = $anchor.outerWidth()

			$('#ng-popover .arrow').css({
				left: anchorPosition.left - elementPosition.left + anchorWidth / 2 - 1
			});
		}

		if (windowWidth < smallScreenBreakpoint && maximize) {
			var padding = popoverWidth - $('#ng-popover').width();
			$('#ng-popover').width(windowWidth - padding - 2 * maximizeMargin);
			pos.left = maximizeMargin;

			if (placement === 'bottom' || placement === 'top') {
				$('#ng-popover .arrow').css({
					left: elementPosition.left + elementWidth / 2 - maximizeMargin
				});				
			}
			// $('html, body').animate({
			// 	scrollTop: pos.top
			// }, 0);
		} else {
			$('#ng-popover').width(popoverWidth);			
		}
		return pos;
	}

	// Hide popovers when pressing esc
	$('body').on('keyup', function(ev) {
		if(ev.keyCode === 27) {
			$('#ng-popover').fadeOut(200, function() {
				$(this).remove();
				open = false;
			});
		}
	});

	this.$get = ['$rootScope', '$templateCache', '$compile', function($rootScope, $templateCache, $compile) {
		return {

			setup: function(options) {
				smallScreenBreakpoint = options.smallScreenBreakpoint || 500;
				maximizeMargin = options.maximizeMargin || 0;
				overlayClasses = options.overlayClasses || [];
			}, 

			close: function(data) {
				$rootScope.$broadcast('ng-popover-hide', data);
			}, 

			open: function(element, scope, options) {
				var template = $templateCache.get(options.template || options.ngPopover);
				if (!template) {
					template = options.template || options.ngPopover;
				}
				var placement = options.placement || 'bottom';
				var maximize = options.maximize || false;
				var title = options.title || '';
				var useParentWidth = options.useparentwidth || false;
				var anchorSelector = options.anchorselector || '';
				var maxWidth = options.maxwidth || null;

				if (options.data) {
					scope = scope.$new();
					scope.rrData = options.data;
				}

				var setupClick = function() {
					$('body').append("<div id='ng-popover' style='display:none'>" + 
										"<div class='arrow'></div>" + 
										( title != '' ? "<div class='title'>" + title + "</div>" : "" ) + 
										"<div class='content'>" + 
											template +
										"</div>" + 
										( title != '' ? "<a href='' class='close-pop'>X</a>" : "" ) + 
									"</div>");
					$compile($('#ng-popover').contents())(scope);
					scope.$apply();

					var popoverPosition = calcPosition(element, placement, maximize, useParentWidth, anchorSelector, maxWidth);

					$('.close-pop').on('click', function() {
						$('#ng-popover').fadeOut(200, function() {
							$(this).remove();
							open = false;
						});
					});

					var placementClass = placement; 
					if (placement === 'bottom' && title === '') {
						placementClass = 'bottom-no-title';
					}

					$('#ng-popover')
						.css({
							left: popoverPosition.left, 
							top: popoverPosition.top
						})
						.toggleClass(placementClass)
						.fadeIn(100, function() {
							open = true;
						});

				}

				$(element).on('click', function(evt) {
					if (!open) {

						currentTarget = evt.target;

						$rootScope.$broadcast('ng-popover-show', scope);
							
						if (options.init) {
							var promise = scope.$eval(options.init);
							if (typeof promise == 'object') {							
								promise.then(function() {
									setTimeout(setupClick, 0);
								});
							} else {
								setupClick();
							}

						} else {
							setupClick();
						}
					}
				});

				scope.$on('ng-popover-hide', function() {
					$('#ng-popover').fadeOut(100, function() {
						$(this).remove();
						open = false;
					});
				});

			}
		}
	}]
});


module.directive('ngPopover', ['ngPopover', function(ngPopover) {

	return {
		restrict: 'A', 
		link: function(scope, element, attrs) {
			ngPopover.open(element, scope, attrs);
		}
	}

}]);