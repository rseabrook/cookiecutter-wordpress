<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package {{ cookiecutter.theme_slug }}
 */

?>
            </div><!-- #content -->
            <footer id="colophon" class="footer" role="contentinfo">
                <div class="footer__inner">
                    <?php {{ cookiecutter.theme_slug }}_brand_link( 'footer__wordmark' ); ?>
                    <p class="footer__credits">
                        <span class="footer__copyright">&copy; <?php echo esc_html( date( 'Y' ) ); ?> <?php echo esc_html( get_bloginfo( 'name' ) ); ?></span>
                        <a class="footer__site-credits" href="https://www.gadaboutcreative.com/" target="_blank" rel="noopener">Site Credits</a>
                    </p>
                </div>
            </footer>
        </div><!-- #page -->

        <?php wp_footer(); ?>
    </body>
</html>
