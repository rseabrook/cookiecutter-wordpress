<?php
/**
 * The template for displaying all single posts.
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
                            <header class="entry-header">
                                <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                            </header><!-- .entry-header -->
                            <div class="entry-content">
                                <?php the_content(); ?>
                            </div><!-- .entry-content -->
                            <footer class="entry-footer">
                                <div class="post-date flex-shrink-0"><?php echo get_the_date( 'm / d' ); ?></div>
                            </footer>

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
