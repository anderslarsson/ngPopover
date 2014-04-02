var module = angular.module('rrPopover', []);

module.provider('rrPopover', function () {

	var open = false;

	var calcPosition = function(element, placement, maximize) {

		var elementPosition = $(element).offset();
		var elementWidth = $(element).outerWidth();
		var elementHeight = $(element).outerHeight();
		var popoverWidth = $('#rr-popover').outerWidth();
		var popoverHeight = $('#rr-popover').outerHeight();
		var windowWidth = $(window).width();

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
			console.log(elementPosition.left, elementWidth, popoverWidth);
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

				$('#rr-popover .arrow').css({
					top: adjustedTop + popoverHeight / 2
				});
			}					
		}

		if (placement === 'bottom' || placement === 'top') {
			var adjustedLeft = 0;
			if (pos.left + popoverWidth > viewport.right) {
				adjustedLeft = Math.min(pos.left, pos.left + popoverWidth - viewport.right);
				pos.left -= adjustedLeft;

				$('#rr-popover .arrow').css({
					left: adjustedLeft + popoverWidth / 2
				});
			}					
		}

		if (windowWidth < 500 && maximize) {
			var padding = popoverWidth - $('#rr-popover').width();
			$('#rr-popover').width(windowWidth - padding);
			pos.left = 0;
			$('html, body').animate({
				scrollTop: pos.top
			}, 0);
		} 
		return pos;
	}

	// Hide popovers when pressing esc
	$('body').on('keyup', function(ev) {
		if(ev.keyCode === 27) {
			$('#rr-popover').fadeOut(200, function() {
				$(this).remove();
				open = false;
			});
		}
	});

	this.$get = function($rootScope, $templateCache, $compile) {
		return {
			close: function(data) {
				$rootScope.$broadcast('rr-popover-hide', data);
			}, 

			popover: function(element, scope, options) {
				var template = $templateCache.get(options.template);
				var placement = options.placement || 'bottom';
				var maximize = options.maximize || false;
				var title = options.title || '';

				if (options.data) {
					scope = scope.$new();
					scope.rrData = options.data;
				}

				$(element).on('click', function(evt) {
					if (open) {
						$('#rr-popover').fadeOut(200, function() {
							$(this).remove();
						});
					} else {
						$('body').append("<div id='rr-popover' style='display:none'>" + 
											"<div class='arrow'></div>" + 
											"<div class='title'>" + title + "</div>" + 
											"<div class='content'>" + 
												template +
											"</div>" + 
											"<a href='' class='close-pop'>X</a>" + 
										"</div>");
						$compile($('#rr-popover').contents())(scope);
						scope.$apply();

						var popoverPosition = calcPosition(element, placement, maximize);

						$('.close-pop').on('click', function() {
							$('#rr-popover').fadeOut(200, function() {
								$(this).remove();
								open = false;
							});
						});

						$('#rr-popover')
							.css({
								left: popoverPosition.left, 
								top: popoverPosition.top
							})
							.toggleClass(placement)
							.fadeIn(100);
					}
					open = !open;
				});

				scope.$on('rr-popover-hide', function() {
					$('#rr-popover').fadeOut(100, function() {
						$(this).remove();
						open = false;
					});
				});

			}
		}
	}
});

module.directive('rrPopover', function($templateCache, $compile, rrPopover) {

	return {
		restrict: 'C', 
		link: function(scope, element, attrs) {
			rrPopover.popover(element, scope, attrs);
		}
	}

});