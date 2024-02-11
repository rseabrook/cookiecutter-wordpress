(function($){	
	$(document).ready(function(){
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