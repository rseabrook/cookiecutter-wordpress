<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
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
