<?php
$defaults = array(
    'section_classes' => 'py-5',
    'image_url' => '',
);
$args = wp_parse_args( $args, $defaults );
?>
<div class="section__image-banner <?php echo $args['section_classes']; ?>">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <img class="img-fluid" src="<?php echo $args['image_url']; ?>" alt="<?php echo $args['image_alt']; ?>">
            </div>
        </div>
    </div>
</div>