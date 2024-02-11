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
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <p>
                                <span>&copy; <?php echo date('Y'); ?> <?php echo bloginfo('name'); ?></span>
                                <span class="sep">|</span>
                                <span>Made by <a href="https://www.gadaboutcreative.com/" target="_blank">Gadabout</a></span>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div><!-- #page -->

        <?php wp_footer(); ?>
    </body>
</html>
