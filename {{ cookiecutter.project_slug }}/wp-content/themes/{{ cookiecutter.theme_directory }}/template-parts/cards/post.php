<div class="post-card">
    <a class="post-card-inner" href="<?php the_permalink(); ?>">
        <div class="post-card__image" style="background-image: url(<?php the_post_thumbnail_url( 'large' ); ?>);"></div>
        <h3 class="post-card__title"><?php the_title(); ?></h3>
    </a>
</div>
