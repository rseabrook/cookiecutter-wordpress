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

		// Remove the homepage loading screen once it has finished fading out (the
		// CSS holds it hidden + click-through via `forwards`; this just drops the
		// node so it can't trap focus/pointer events). Filter to the screen's own
		// animation so the icon's bubbled fade-in animationend doesn't remove it early.
		const loadingScreen = document.querySelector('.loading-screen');
		if (loadingScreen) {
			loadingScreen.addEventListener('animationend', function(e) {
				if (e.target === loadingScreen && e.animationName === 'loadingScreenFadeOut') {
					loadingScreen.remove();
				}
			});
		}

		const overlay = document.querySelector('.page-transition-overlay');
		let currentBgColor = null;
		let newBgColor = null;

		function showOverlay() {
			if (!overlay) {
				return gsap.to({}, { duration: 0 });
			}
			// Capture the leaving page's background color so the overlay can
			// smoothly cross-fade to the next page's background (e.g. when a page
			// template flips the palette). beforeEnter reads the new color below.
			currentBgColor = getComputedStyle(document.body).backgroundColor;
			overlay.style.backgroundColor = currentBgColor;
			overlay.style.pointerEvents = 'auto';
			return gsap.to(overlay, {
				autoAlpha: 1,
				duration: 0.6,
				ease: 'power2.out'
			});
		}

		function hideOverlay(container) {
			if (!overlay) {
				return;
			}
			const imgLoad = imagesLoaded(container);

			// Use 'always' (fires after every image loads OR fails) rather than
			// 'done' (success only). A single broken/empty-src image would
			// otherwise never fire 'done', leaving the overlay stuck on screen and
			// freezing the transition. A hard refresh would work (it bypasses
			// Barba) but in-site navigation would appear broken.
			return imgLoad.on('always', () => {
				const tl = gsap.timeline();

				// Animate the overlay's background color when it differs between
				// pages, then fade the overlay out to reveal the new page.
				if (currentBgColor && newBgColor && currentBgColor !== newBgColor) {
					tl.to(overlay, {
						backgroundColor: newBgColor,
						duration: 0.8,
						ease: 'power2.inOut'
					});
				}

				tl.to(overlay, {
					autoAlpha: 0,
					duration: 0.6,
					ease: 'power2.inOut',
					onComplete: () => {
						overlay.style.pointerEvents = 'none';
					}
				});

				return tl;
			});
		}

		barba.init({
			transitions: [{
				name: 'overlay-transition',
				leave: ({ current }) => {
					// Close drawer at the same time as fade out
					if (jQuery('.drawer').hasClass('active')) {
						jQuery('.toggler').removeClass('active');
						jQuery('.drawer').fadeOut().removeClass('active');
						jQuery('body').removeClass('active');
					}
					return showOverlay();
				},
				enter: ({ next }) => {
					hideOverlay(next.container);
				}
			}]
		});

		barba.hooks.beforeEnter((data) => {
			// Reset scroll position while container is hidden
			window.scrollTo(0, 0);

			// Strip <noscript> blocks before parsing. DOMParser parses with the
			// scripting flag disabled, so <noscript> contents are tokenized as
			// real elements; anything not valid inside <head> would implicitly
			// close <head> and break head sync. They're identical on every page
			// and already present from the initial load, so we don't need them.
			const sanitizedHtml = data.next.html.replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, '');
			const nextDocument = new DOMParser().parseFromString(sanitizedHtml, 'text/html');

			// Replace per-page <head> singletons (title, canonical, description,
			// Open Graph, Twitter card) so SEO/social tags reflect the new page.
			const replaceSelector = [
				'title',
				'link[rel="canonical"]',
				'meta[name="description"]',
				'meta[property^="og:"]',
				'meta[name^="twitter:"]',
			].join(', ');
			document.head.querySelectorAll(replaceSelector).forEach((el) => el.remove());
			nextDocument.head.querySelectorAll(replaceSelector).forEach((newEl) => {
				document.head.appendChild(newEl.cloneNode(true));
			});

			// Additively add any other new head elements not already present
			// (e.g. block CSS that WordPress enqueues only on certain pages).
			const elementExistsInArray = (element, array) =>
				array.some((el) => el.isEqualNode(element));
			const newHeadElements = [...nextDocument.head.children];
			const currentHeadElements = [...document.head.children];
			newHeadElements.forEach((newEl) => {
				if (newEl.matches(replaceSelector)) return;
				if (!elementExistsInArray(newEl, currentHeadElements)) {
					document.head.appendChild(newEl.cloneNode(true));
				}
			});

			// Sync <body> classes from the incoming container's data attribute.
			// Barba only swaps the container, never <body>, so page-specific body
			// classes (page templates, is_front_page, etc.) would otherwise keep
			// the first-loaded page's values on in-site navigation. Then read the
			// new background color for the overlay cross-fade above.
			const newBodyClasses = data.next.container.dataset.bodyClass;
			if (newBodyClasses) {
				document.body.className = newBodyClasses;
			}
			newBgColor = getComputedStyle(document.body).backgroundColor;
		});

		barba.hooks.afterEnter(() => {
			// Re-initialize scripts that may have been destroyed by the transition
			// (sliders, masonry, etc.). Tear those down in barba.hooks.beforeLeave.
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
