<?php
$defaults = array(
    'grid_classes' => '',
    'card_template' => 'template-parts/cards/post',
    'zero_results_message' => '',
);
$args = wp_parse_args( $args, $defaults );
?>
<div class="component__post-grid">
    <?php
        if ( have_posts() ) { ?>
            <div class="post-grid <?php echo $args['grid_classes']; ?>">
                <?php while ( have_posts() ) : the_post();

                    get_template_part( $args['card_template'] );

                endwhile; // End of the loop. ?>
            </div>
        <?php } else {
            if ( $args['zero_results_message'] ) { ?>
                <div class="results-message-wrapper">
                    <p class="results-message"><?php echo $args['zero_results_message']; ?></p>
                </div>
            <?php }
        }
    ?>
</div>
