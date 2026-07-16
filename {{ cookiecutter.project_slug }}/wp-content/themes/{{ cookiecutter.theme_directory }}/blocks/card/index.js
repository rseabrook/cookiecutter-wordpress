/**
 * Example Card — starter CHILD block (dynamic).
 *
 * Demonstrates: an editable RichText attribute, `save: () => null` (fully dynamic
 * — the markup is produced by render.php), and a `parent` restriction so it can
 * only live inside example/grid. Copy this folder and rename for a real block.
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';

registerBlockType( 'example/card', {
	edit: function Edit( { attributes, setAttributes } ) {
		const { content } = attributes;
		const blockProps = useBlockProps( { className: 'example-card' } );

		return (
			<div { ...blockProps }>
				<RichText
					tagName="p"
					className="example-card__content"
					value={ content }
					onChange={ ( value ) => setAttributes( { content: value } ) }
					placeholder="Write something…"
				/>
			</div>
		);
	},
	// Dynamic block: render.php owns the front-end markup.
	save: function () {
		return null;
	},
} );
