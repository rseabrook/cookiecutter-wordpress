<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package {{ cookiecutter.theme_slug }}
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

        <?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>{% if cookiecutter.enable_animations %} data-barba="wrapper"{% endif %}>
        {% if cookiecutter.enable_animations %}
            <div class="page-transition-overlay" aria-hidden="true">
                <div class="page-transition-overlay__inner"></div>
            </div>
        {% endif %}
        {% if cookiecutter.enable_animations %}
        <?php if ( is_front_page() ) { ?>
            <div class="loading-screen">
                <div class="loading-screen__icon">
                    <?php echo file_get_contents( get_template_directory() . '/assets/images/wordmark.svg' ); ?>
                </div>
            </div>
        <?php } ?>
        {% endif %}
        <div class="drawer" style="display: none;">
            <button class="drawer__close" type="button" aria-label="Close menu">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <path d="M4 4 L24 24 M24 4 L4 24" stroke="currentColor" stroke-width="1" stroke-linecap="round" />
                </svg>
            </button>
            <div class="drawer__inner">
                <?php {{ cookiecutter.theme_slug }}_brand_link( 'drawer__wordmark' ); ?>
                <nav class="drawer__nav" aria-label="Primary">
                    <?php wp_nav_menu( array(
                        'theme_location' => 'mobile',
                        'container'      => false,
                        'menu_class'     => 'drawer__menu',
                        'fallback_cb'    => false,
                    ) ); ?>
                </nav>
            </div>
        </div>
        <div id="page" class="site"{% if cookiecutter.enable_animations %} data-barba="container" data-barba-namespace="<?php echo {{ cookiecutter.theme_slug }}_get_barba_namespace(); ?>" data-body-class="<?php echo esc_attr( implode( ' ', get_body_class() ) ); ?>"{% endif %}>
            <header id="masthead" class="header" role="banner">
                <div class="header__inner">
                    <?php {{ cookiecutter.theme_slug }}_brand_link( 'header__wordmark' ); ?>
                    <nav class="header__nav" aria-label="Primary">
                        <?php wp_nav_menu( array(
                            'theme_location' => 'primary',
                            'container'      => false,
                            'menu_class'     => 'header__menu',
                            'fallback_cb'    => false,
                        ) ); ?>
                    </nav>
                    <button class="header__toggler" type="button" aria-label="Menu" aria-expanded="false">
                        <span></span><span></span>
                    </button>
                </div>
            </header>
            <div id="content" class="site-content">
