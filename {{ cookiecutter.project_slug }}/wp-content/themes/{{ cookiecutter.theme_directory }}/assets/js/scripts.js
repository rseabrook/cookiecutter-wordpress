(function($){	
	$(document).ready(function(){
		{% if cookiecutter.enable_animations %}
		/*-------------------------------------
			
			Animations
			
		-------------------------------------*/
		// TODO: Figure out a better way to integrate barba/gsap animations with existing nav drawer, etc scripts.

		// Enable prefetch plugin - preloads pages on hover
		if (typeof barbaPrefetch !== 'undefined') {
			barba.use(barbaPrefetch);
		}

		/**
		 * Fade out the current container
		 */
		function fadeOut(container) {
			return gsap.to(container, {
				autoAlpha: 0,
				duration: 1.75,
				ease: 'power2.inOut'
			});
		}

		/**
		 * Fade in the new container after all images have loaded
		 */
		function fadeIn(container) {
			gsap.set(container, { autoAlpha: 0 });

			const imgLoad = imagesLoaded(container);

			return imgLoad.on('done', () => {
				return gsap.to(container, {
					autoAlpha: 1,
					duration: 1.75,
					ease: 'power2.inOut'
				});
			});
		}

		barba.init({
			transitions: [{
				name: 'fade-transition',
				leave: ({ current }) => {
					// Close drawer at the same time as fade out
					if (jQuery('.drawer').hasClass('active')) {
						jQuery('.toggler').removeClass('active');
						jQuery('.drawer').fadeOut().removeClass('active');
						jQuery('body').removeClass('active');
					}
					return fadeOut(current.container);
				},
				enter: ({ next }) => {
					fadeIn(next.container);
				}
			}]
		});

		barba.hooks.beforeEnter((data) => {
			// Reset scroll position while container is hidden
			window.scrollTo(0, 0);

			// Add new elements to the head that are not in the current head
			const elementExistsInArray = (element, array) =>
				array.some((el) => el.isEqualNode(element));

			const nextDocument = new DOMParser().parseFromString(data.next.html, 'text/html');
			const newHeadElements = [...nextDocument.head.children];
			const currentHeadElements = [...document.head.children];

			// Add new elements that are not in the current head
			newHeadElements.forEach((newEl) => {
				if (!elementExistsInArray(newEl, currentHeadElements)) {
					document.head.appendChild(newEl.cloneNode(true));
				}
			});
		});

		barba.hooks.afterEnter(() => {
			// Re-initialize scripts that may have been destroyed by the transition
		});
		{% endif %}

		/*-------------------------------------
			
			Nav Drawer
			
		-------------------------------------*/
		$('.header .toggler').on('click', function() {
            $(this).toggleClass('active');
            $('.drawer').fadeToggle().css('display', 'flex');
			$('.drawer').toggleClass('active');
			$('body').toggleClass('active');
		});
		
		/*-------------------------------------
			
			Scroll
			
		-------------------------------------*/
		
		// var menuOffset = $('#masthead').offset().top;
		
		// $(document).bind('scroll',function() {
			
		// 	var docScroll = $(document).scrollTop();
				
		// 	// Sticky Header
		// 	if ( docScroll >= 1 ) {
		// 	// if ( docScroll >= menuOffset ) {
		// 		$('body, #masthead').addClass('fixed');
		// 	} else {
		// 		$('body, #masthead').removeClass('fixed');
		// 	}

		// });

		// /* Show header on scroll up and hide on scroll down */
		// let header = $('.header');
		// let drawer = $('.drawer');
		// let previousScrollOffset = 0;
		// $(window).scroll(function() {
		// 	if (drawer.hasClass('active')) return;

		// 	const scrollOffset = $(window).scrollTop();
		// 	const height = header.height();
		// 	var top = 0;
		// 	if (scrollOffset > previousScrollOffset) {
		// 		top = -height;
		// 	}
		// 	else {
		// 		header.css({top: 0});
		// 	}

		// 	if (scrollOffset <= height) top = 0;

		// 	header.css({top: top});
		// 	previousScrollOffset = scrollOffset;
		// });

		/*-------------------------------------
			
			Images Loaded
			
		-------------------------------------*/
		// This is used to gently fade an image in once loaded
		// $('.background_image--desktop').imagesLoaded( function() {
		// 	$('.background_image--desktop').addClass('loaded');
		// });

		/*-------------------------------------
			
			Masonry
			
		-------------------------------------*/
		// This could be refactored to better combine masonry+infinite scroll below.
		// var $masonry = $('.masonry').masonry({
		// 	percentPosition: true
		// });
		// $('.infinite-scroll__item').on('inview', function(event, isInView) {
		// 	if (isInView) {
		// 		$(this).addClass('fadeInUp');
		// 	}
		// });
		// $masonry.imagesLoaded().progress( function() {
		// 	$masonry.masonry('layout');
		// });

		/*-------------------------------------
			
			Infinite Scroll
			
		-------------------------------------*/
		// This could be refactored to better combine masonry+infinite scroll above.
		// let msnry = $masonry.data('masonry');

		// let $container = $('.infinite-scroll__container').infiniteScroll({
		// 	path: '.pagination a.next',
		// 	append: '.infinite-scroll__item',
		// 	checkLastPage: true,
		// 	hideNav: '.pagination-wrapper',
		// 	status: '.page-load-status',
		// 	history: false,
		// 	outlayer: msnry,
		// });

		// $container.on( 'append.infiniteScroll', function(event, body, path, items, response) {
		// 	$(items).imagesLoaded( function() {
		// 		$('.infinite-scroll__item').on('inview', function(event, isInView) {
		// 			if (isInView) {
		// 				$(this).addClass('fadeInUp');
		// 			}
		// 		});
		// 	});
		// });

		/*-------------------------------------
			
			External Links
			
		-------------------------------------*/
		// Automatically open all external links in a new tab.
		// $(document.links).filter(function() {
		// 	return this.hostname != window.location.hostname;
		// }).attr({
		// 	target: '_blank',
		// 	rel: 'noopener'
		// });
	});
})(jQuery);
