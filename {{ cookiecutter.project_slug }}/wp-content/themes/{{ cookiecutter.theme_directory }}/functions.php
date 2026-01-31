<?php
/**
 * {{ cookiecutter.project_name }} functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package {{ cookiecutter.theme_slug }}
 */

if ( ! function_exists( '{{ cookiecutter.theme_slug }}_setup' ) ) {
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 *
	 * @return void
	 */
	function {{ cookiecutter.theme_slug }}_setup() {
		/*
		 * Let WordPress manage the document title.
		 * This theme does not use a hard-coded <title> tag in the document head,
		 * WordPress will provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Register nav menus
		 */
		register_nav_menus(
			array(
                'primary' => esc_html__( 'Primary', '{{ cookiecutter.theme_slug }}' ),
				'footer' => esc_html__( 'Footer', '{{ cookiecutter.theme_slug }}' ),
			)
		);
    }
}
add_action( 'after_setup_theme', '{{ cookiecutter.theme_slug }}_setup' );

/**
 * Enqueue scripts and styles.
 *
 * @return void
 */
function {{ cookiecutter.theme_slug }}_scripts() {
	wp_enqueue_style( 'bootstrap-styles', get_template_directory_uri() . '/assets/css/vendor/bootstrap.min.css', array(), '5.3.1' );
	// wp_enqueue_style( 'slick-styles', get_template_directory_uri() . '/assets/css/vendor/slick.css', array('bootstrap-styles'), '1.8.1' );
	wp_enqueue_style( 'styles', get_template_directory_uri() . '/style.css', array('bootstrap-styles'), wp_get_theme()->get( 'Version' ) );

	// wp_enqueue_script( 'inview', get_template_directory_uri() . '/assets/js/vendor/jquery.inview.min.js' , array('jquery') );
	// wp_enqueue_script( 'infinite-scroll', get_template_directory_uri() . '/assets/js/vendor/infinite-scroll.pkgd.min.js', array('jquery'), '4.0.1' );
	wp_enqueue_script( 'bootstrap-scripts', get_template_directory_uri() . '/assets/js/vendor/bootstrap.bundle.min.js', array(), '5.3.1' );
	// wp_enqueue_script( 'slick', get_template_directory_uri() . '/assets/js/vendor/slick.min.js', array('jquery') );
	// wp_enqueue_script( 'masonry', get_template_directory_uri() . '/assets/js/vendor/masonry.pkgd.min.js', array(), '4.2.2' );
	{% if cookiecutter.enable_animations %}
	wp_enqueue_script( 'imagesloaded', get_template_directory_uri() . '/assets/js/vendor/imagesloaded.pkgd.min.js', array(), '5.0.0' );
	wp_enqueue_script( 'gsap', get_template_directory_uri() . '/assets/js/vendor/gsap.min.js', array(), '3.14.2' );
	wp_enqueue_script( 'barba', get_template_directory_uri() . '/assets/js/vendor/barba.umd.js', array(), '2.10.3' );
	wp_enqueue_script( 'barba-prefetch', get_template_directory_uri() . '/assets/js/vendor/barba-prefetch.umd.js', array('barba'), '2.2.0' );
	wp_enqueue_script( 'scripts', get_template_directory_uri() . '/assets/js/scripts.js', array( 'jquery', 'imagesloaded', 'gsap', 'barba', 'barba-prefetch' ) );
	{% else %}
	wp_enqueue_script( 'scripts', get_template_directory_uri() . '/assets/js/scripts.js', array( 'jquery' ) );
	{% endif %}
}
add_action( 'wp_enqueue_scripts', '{{ cookiecutter.theme_slug }}_scripts' );

/**
 * Add custom classes to the array of body classes.
 * 
 * @param array $classes Classes for the body element.
 * @return array
 */
function {{ cookiecutter.theme_slug }}_body_classes( $classes )
{
	/* 
	 * Add a class of <post type>-<post name> (ie. 'page-about') to target individual pages.
	 */
	global $post;
	if ( isset( $post ) ) {
		$classes[] = $post->post_type . '-' . $post->post_name;
	}

	return $classes;
}
add_filter('body_class', '{{ cookiecutter.theme_slug }}_body_classes');

{% if cookiecutter.enable_animations %}
/**
 * Get the Barba.js namespace for the current page.
 *
 * @return string The namespace identifier for Barba transitions.
 */
function {{ cookiecutter.theme_slug }}_get_barba_namespace() {
	if ( is_front_page() ) {
		return 'front-page';
	}

	if ( is_home() ) {
		return 'home';
	}

	if ( is_singular() ) {
		global $post;
		if ( $post->post_type === 'page' ) {
			return 'page-' . $post->post_name;
		}
		return $post->post_type;
	}

	if ( is_post_type_archive() ) {
		return 'archive-' . get_query_var( 'post_type' );
	}

	if ( is_tax() || is_category() || is_tag() ) {
		$term = get_queried_object();
		return 'archive-' . $term->taxonomy;
	}

	if ( is_archive() ) {
		return 'archive';
	}

	if ( is_search() ) {
		return 'search';
	}

	if ( is_404() ) {
		return '404';
	}

	return 'default';
}
{% endif %}

/**
 * Disable Contact Form 7 from auto-adding <p> tags to each input
 */
add_filter('wpcf7_autop_or_not', '__return_false');

/**
 * Change the number of posts per page depending on page type
 */
function {{ cookiecutter.theme_slug }}_change_posts_per_page( $query ) {
	if ( is_admin() || ! $query->is_main_query() ) {
		return;
	}

	if (is_tax( 'shop-category' ) ) { 
		$query->set( 'posts_per_page', 16 );
	}
}
add_filter( 'pre_get_posts', '{{ cookiecutter.theme_slug }}_change_posts_per_page' );

/*-------------------------------------------------------------------------------------
	
	Custom Block Styles
	
-------------------------------------------------------------------------------------*/
function {{ cookiecutter.theme_slug }}_enqueue_block_assets() {
    wp_enqueue_style(
        '{{ cookiecutter.theme_slug }}-block-styles',
        get_stylesheet_directory_uri() . '/assets/css/blocks.css',
    );
}
add_action( 'enqueue_block_assets', '{{ cookiecutter.theme_slug }}_enqueue_block_assets' );

function {{ cookiecutter.theme_slug }}_register_block_styles() {
	register_block_style( 'core/paragraph', array(
		'name' => 'cormorant-garamond-12',
		'label' => __( 'Cormorant Garamond 10px', '{{ cookiecutter.theme_slug }}' ),
	) );
}
add_action( 'init', '{{ cookiecutter.theme_slug }}_register_block_styles' );
