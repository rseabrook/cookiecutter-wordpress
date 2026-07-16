/**
 * Example Grid — starter PARENT block (dynamic + InnerBlocks).
 *
 * Demonstrates the reusable patterns:
 *  - InnerBlocks restricted to one child type, with the "+" appender.
 *  - A reactive CLASS (`has-N-columns`) driven by an attribute — NOT a CSS custom
 *    property in useBlockProps({ style }), which does NOT update reactively in the
 *    editor. className does.
 *  - Manual block-gap (blockGap) wiring: a custom grid isn't WordPress layout, so
 *    --wp--style--block-gap is never defined; resolve the value and apply `gap`
 *    directly, in BOTH index.js (here) and render.php.
 *  - save: () => <InnerBlocks.Content /> with a dynamic render.php parent.
 *
 * Copy this folder + blocks/card and rename for your own parent/child blocks.
 */
import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'example/card' ];
const TEMPLATE = [ [ 'example/card' ], [ 'example/card' ] ];

// blockGap arrives as a preset (`var:preset|spacing|40`) or a raw value (`40px`).
function resolveSpacing( value ) {
	if ( ! value ) {
		return undefined;
	}
	return value.indexOf( 'var:' ) === 0
		? 'var(--wp--' + value.slice( 4 ).replace( /\|/g, '--' ) + ')'
		: value;
}

registerBlockType( 'example/grid', {
	edit: function Edit( { attributes, setAttributes } ) {
		const { columns } = attributes;

		// Reactive class (updates live in the editor), not a CSS var.
		const blockProps = useBlockProps( {
			className: 'example-grid has-' + ( columns || 2 ) + '-columns',
		} );

		// Apply block spacing as the grid gap directly (a direct property updates
		// reactively; a CSS var would not).
		const gap = resolveSpacing( attributes.style?.spacing?.blockGap );

		const innerBlocksProps = useInnerBlocksProps(
			{
				className: 'example-grid__inner',
				style: gap ? { gap } : undefined,
			},
			{
				allowedBlocks: ALLOWED_BLOCKS,
				template: TEMPLATE,
				templateLock: false,
				renderAppender: InnerBlocks.ButtonBlockAppender,
			}
		);

		return (
			<>
				<InspectorControls>
					<PanelBody title="Layout">
						<ToggleGroupControl
							label="Columns"
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							isBlock
						>
							<ToggleGroupControlOption value={ 2 } label="2" />
							<ToggleGroupControlOption value={ 3 } label="3" />
						</ToggleGroupControl>
					</PanelBody>
				</InspectorControls>

				<div { ...blockProps }>
					<div { ...innerBlocksProps } />
				</div>
			</>
		);
	},
	save: function () {
		return <InnerBlocks.Content />;
	},
} );
