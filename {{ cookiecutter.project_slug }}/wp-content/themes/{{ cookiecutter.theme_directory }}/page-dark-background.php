<?php
/**
 * Template Name: Dark Background
 *
 * Example custom page template that flips the site's default cream/charcoal
 * palette to charcoal/cream. The color flip itself is pure CSS keyed off the
 * `page-template-page-dark-background` body class that WordPress adds
 * automatically when this template is assigned — see assets/css/blocks.css.
 * assets/js/editor.js mirrors the same class onto the editor canvas so the flip
 * previews while editing. This template file just provides the standard page
 * loop; duplicate it (and its blocks.css rule) to add more color-flip templates.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package {{ cookiecutter.theme_slug }}
 */

get_header(); ?>

    <div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col">

                        <?php
                        while ( have_posts() ) : the_post();
                        ?>
                            <div class="entry-content">
                                <?php the_content(); ?>
                            </div><!-- .entry-content -->

                        <?php
                        endwhile; // End of the loop.
                        ?>

                    </div>
                </div>
            </div>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
