<?php
/**
 * Example Card — server-side render (starter child block).
 *
 * @var array $attributes Block attributes.
 * @package example
 */

$content = $attributes['content'] ?? '';
if ( '' === trim( wp_strip_all_tags( $content ) ) ) {
	return '';
}

$wrapper = get_block_wrapper_attributes( array( 'class' => 'example-card' ) );

// Concatenate, do NOT printf: content can contain literal % that printf would
// misread as format specifiers.
echo '<div ' . $wrapper . '><p class="example-card__content">' . wp_kses_post( $content ) . '</p></div>';
