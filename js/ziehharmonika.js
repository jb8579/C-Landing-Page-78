

(function($) {
	var settings;
	$.fn.ziehharmonika = function(actionOrSettings, parameter) {
		if (typeof actionOrSettings === 'object' || actionOrSettings === undefined) {
			
			settings = $.extend({
			
				headline: 'h3',
				
				prefix: false,
				
				highlander: true,
				
				collapsible: false,
				
				arrow: true,
				
				collapseIcons: {
					opened: '<img src="img/faqicon1.png" alt="icon" />',
					closed: '<img src="img/faqicon2.png" alt="icon" />'
				},
				
				collapseIconsAlign: 'right',
				
				scroll: true
			}, actionOrSettings);
		}
		
		if (actionOrSettings == "open") {
			if (settings.highlander) {
				$(this).ziehharmonika('forceCloseAll');
			}
			var ogThis = $(this);
			$(this).addClass('active').next('div').slideDown(400, function() {
				if (settings.collapseIcons) {
					$('.collapseIcon', ogThis).html(settings.collapseIcons.opened);
				}
				
				if (parameter !== false) {
					smoothScrollTo($(this).prev(settings.collapseIcons));
				}
			});
			return this;
		} else if (actionOrSettings == "close" || actionOrSettings == "forceClose") {
			
			if (actionOrSettings == "close" && !settings.collapsible && $(settings.headline + '[class="active"]').length == 1) {
				return this;
			}
			var ogThis = $(this);
			$(this).removeClass('active').next('div').slideUp(400, function() {
				if (settings.collapseIcons) {
					$('.collapseIcon', ogThis).html(settings.collapseIcons.closed);
				}
			});
			return this;
		} else if (actionOrSettings == "closeAll") {
			$(settings.headline).ziehharmonika('close');
		} else if (actionOrSettings == "forceCloseAll") {
			
			$(settings.headline).ziehharmonika('forceClose');
		}

		if (settings.prefix) {
			$(settings.headline, this).attr('data-prefix', settings.prefix);
		}
		if (settings.arrow) {
			$(settings.headline, this).append('<div class="arrowDown"></div>');
		}
		if (settings.collapseIcons) {
			$(settings.headline, this).each(function(index, el) {
				if ($(this).hasClass('active')) {
					$(this).append('<div class="collapseIcon">'+settings.collapseIcons.opened+'</div>');
				} else {
					$(this).append('<div class="collapseIcon">'+settings.collapseIcons.closed+'</div>');
				}
			});
		}
		if (settings.collapseIconsAlign == 'left') {
			$('.collapseIcon, ' + settings.headline).addClass('alignLeft');
		}

		$(settings.headline, this).click(function() {
			if ($(this).hasClass('active')) {
				$(this).ziehharmonika('close');
			} else {
				$(this).ziehharmonika('open', settings.scroll);
			}
		});
	};
}(jQuery));

function smoothScrollTo(element, callback) {
	var time = 400;
	$('html, body').animate({
		scrollTop: $(element).offset().bottom
	}, time, callback);
}