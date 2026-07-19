<?php
/**
 * Template part for displaying a "no results" message.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package {{ cookiecutter.theme_slug }}
 */
?>
<section class="no-results">
    <h1 class="no-results__title"><?php esc_html_e( 'Nothing Found', '{{ cookiecutter.theme_slug }}' ); ?></h1>
    <?php if ( is_search() ) { ?>
        <p class="no-results__message"><?php esc_html_e( 'Sorry, nothing matched your search. Please try again with different keywords.', '{{ cookiecutter.theme_slug }}' ); ?></p>
    <?php } else { ?>
        <p class="no-results__message"><?php esc_html_e( 'It looks like nothing has been published here yet.', '{{ cookiecutter.theme_slug }}' ); ?></p>
    <?php } ?>
</section>
