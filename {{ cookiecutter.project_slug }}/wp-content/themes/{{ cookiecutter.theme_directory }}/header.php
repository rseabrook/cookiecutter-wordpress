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
            <div class="drawer-inner d-flex flex-column">
                <div class="menu-section--primary">
                    <?php wp_nav_menu( array(
                        'theme_location' => 'primary',
                        'container' => false,
                        'menu_class' => 'menu'
                    ) ); ?>
                </div>
            </div>
        </div>
        <div id="page" class="site"{% if cookiecutter.enable_animations %} data-barba="container" data-barba-namespace="<?php echo {{ cookiecutter.theme_slug }}_get_barba_namespace(); ?>" data-body-class="<?php echo esc_attr( implode( ' ', get_body_class() ) ); ?>"{% endif %}>
            <header id="masthead" class="header" role="banner">
                <div class="container-fluid">
                    <div class="row">
                        <!-- TODO: Create header -->
                    </div>
                </div>
            </header>
            <div id="content" class="site-content">
