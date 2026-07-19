<?php
$defaults = array(
    'section_classes' => '',
    'image_url' => '',
    'image_alt' => '',
);
$args = wp_parse_args( $args, $defaults );
?>
<div class="section__image-banner <?php echo $args['section_classes']; ?>">
    <div class="site-container">
        <img class="section__image-banner-image" src="<?php echo $args['image_url']; ?>" alt="<?php echo $args['image_alt']; ?>">
    </div>
</div>
