<?php
/**
 * The template for displaying the blog page.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package {{ cookiecutter.project_slug }}
 */

get_header(); ?>

    <div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
            <?php
            $args = array(
                'row_classes' => 'row-cols-2 row-cols-md-4 mb-sm-5',
                'heading' => '<h1>All Stories</h1>',
            );
            get_template_part( 'template-parts/sections/paginated-post-grid', null, $args );
            ?>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();