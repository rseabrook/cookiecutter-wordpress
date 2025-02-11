<?php
/**
 * The template for displaying a static home page.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package {{ cookiecutter.project_slug }}
 */

get_header(); ?>
<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">
        <?php
        $section_1_image = get_field( 'section_1_image', 'options' );
        $section_1_image_url = $section_1_image['sizes'][ 'large' ];
        $args = array(
            'section_classes' => 'py-sm-5',
            'image_url' => $section_1_image_url,
        );
        get_template_part( 'template-parts/sections/image-banner', null, $args );
        ?>
    </main>
</div>

<?php
get_footer();