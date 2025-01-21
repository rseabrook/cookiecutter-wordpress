<?php
$defaults = array(
    'row_classes' => 'row-cols-2 row-cols-md-4',
    'card_classes' => 'col',
    'card_template' => 'template-parts/cards/post',
    'zero_results_message' => '',
);
$args = wp_parse_args( $args, $defaults );

$card_args = array(
    'card_classes' => $args['card_classes'],
);
?>
<div class="component__post-grid">
    <?php
        if ( have_posts() ) { ?>
            <div class="row <?php echo $args['row_classes']; ?>">
                <?php while ( have_posts() ) : the_post();

                    get_template_part( $args['card_template'], null, $card_args );
                    
                endwhile; // End of the loop. ?>
            </div>
        <?php } else {
            if ( $args['zero_results_message'] ) { ?>
                <div class="results-message-wrapper">
                    <p class="results-message text-center"><?php echo $args['zero_results_message']; ?></p>
                </div>
            <?php }
        }
    ?>
</div>