/**
 * Mirror the selected page template's `page-template-*` body class onto the
 * block editor canvas so template-specific styling previews while editing.
 *
 * WordPress adds a `page-template-<file>` class to the front-end <body> for the
 * assigned page template, but the editor iframe never gets it — so a CSS color
 * flip keyed off that class (see assets/css/blocks.css) wouldn't show in the
 * editor. This derives the same class WordPress core would add and toggles it on
 * the editor canvas. Because blocks.css loads in both the editor and the front
 * end, one CSS rule then previews identically in both.
 *
 * Generic on purpose: works for ANY template file with no per-template code —
 * add a new flip template by creating the PHP template + a blocks.css rule.
 */
( function ( wp ) {
	if ( ! wp || ! wp.data ) {
		return;
	}

	var subscribe = wp.data.subscribe;
	var select    = wp.data.select;

	// The canvas is an iframe in the modern editor; fall back to the inline
	// wrapper for the rare non-iframed case.
	function getCanvasBody() {
		var iframe = document.querySelector( 'iframe[name="editor-canvas"]' );
		if ( iframe && iframe.contentDocument && iframe.contentDocument.body ) {
			return iframe.contentDocument.body;
		}
		return document.querySelector( '.editor-styles-wrapper' );
	}

	// 'page-dark-background.php' -> 'page-template-page-dark-background'
	// (mirrors WordPress core's get_body_class() template class).
	function templateClass( template ) {
		if ( ! template || template === 'default' ) {
			return '';
		}
		return 'page-template-' + template.replace( /\.php$/, '' ).replace( /\./g, '-' );
	}

	subscribe( function () {
		var editor = select( 'core/editor' );
		if ( ! editor ) {
			return;
		}

		var body = getCanvasBody();
		if ( ! body ) {
			return;
		}

		var desired = templateClass( editor.getEditedPostAttribute( 'template' ) );

		// Any `page-template-page-*` class on the canvas body was added by us
		// (core doesn't add them here), so it's safe to clear and reapply.
		var current = Array.prototype.filter.call( body.classList, function ( c ) {
			return c.indexOf( 'page-template-page-' ) === 0;
		} );

		var alreadyCorrect = current.length === ( desired ? 1 : 0 ) && current[ 0 ] === desired;
		if ( alreadyCorrect ) {
			return;
		}

		current.forEach( function ( c ) {
			body.classList.remove( c );
		} );
		if ( desired ) {
			body.classList.add( desired );
		}
	} );
}( window.wp ) );
