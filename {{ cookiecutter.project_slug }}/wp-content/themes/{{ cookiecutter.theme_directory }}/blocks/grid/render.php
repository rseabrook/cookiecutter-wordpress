<?php
/**
 * Example Grid — server-side render (starter parent block).
 *
 * Wraps the already-rendered inner Example Card blocks ($content) in a grid.
 * Mirrors index.js: a reactive `has-N-columns` class + manual block-gap wiring
 * (a custom grid isn't WordPress layout, so --wp--style--block-gap is never
 * defined; resolve the value and apply `gap` directly).
 *
 * @var array  $attributes Block attributes.
 * @var string $content    Rendered inner blocks.
 * @package example
 */

if ( '' === trim( $content ) ) {
	return '';
}

$columns = isset( $attributes['columns'] ) ? (int) $attributes['columns'] : 2;
if ( ! in_array( $columns, array( 2, 3 ), true ) ) {
	$columns = 2;
}

// Resolve block spacing (blockGap): preset syntax -> CSS var, otherwise passthrough.
$block_gap = $attributes['style']['spacing']['blockGap'] ?? '';
if ( $block_gap && 0 === strpos( $block_gap, 'var:' ) ) {
	$block_gap = 'var(--wp--' . str_replace( '|', '--', substr( $block_gap, 4 ) ) . ')';
}
$inner_style = $block_gap ? ' style="gap:' . esc_attr( $block_gap ) . '"' : '';

$wrapper = get_block_wrapper_attributes( array( 'class' => 'example-grid has-' . $columns . '-columns' ) );

// Concatenate, do NOT printf: $content contains percent-encoded URLs and other
// literal % that printf would misinterpret as format specifiers.
echo '<div ' . $wrapper . '><div class="example-grid__inner"' . $inner_style . '>' . $content . '</div></div>';
