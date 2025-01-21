<?php
$defaults = array(
    'card_classes' => 'col',
);
$args = wp_parse_args( $args, $defaults );
?>
<div class="post-card <?php echo $args['card_classes']; ?> mb-sm-4">
    <a class="post-card-inner" href="<?php the_permalink(); ?>">
        <div class="post-card__image bg-image mb-3" style="background-image: url(<?php the_post_thumbnail_url( 'large' ); ?>);"></div>
        <h3 class="mb-4 mb-sm-3"><?php the_title(); ?></h3>
    </a>
</div>