/**
 * Block appearing in the block section of grapesjs. Can be dragged onto the canvas to generate a StrapiBlock.
 */

import { strapiRef } from './consts';

export default function(editor, userOptions = {}) {
  const bm = editor.BlockManager;

  // These are the styles that can be used both in the components and in the live view.
  // See component.js onRender().
  // These styles will also appear in the template's css.
  // NOTE: only styles that have '.strapi-block' in them will be put into the template's css.
  const style = userOptions.defaultStyle
    ? `<style>
    .strapi-block {
      width: fit-content;
    }
    .strapi-block .strapi-block-block {
      display: inline-block;
      margin: 0 10px;
      padding: 10px;
    }
  </style>`
    : '';

  bm.remove(strapiRef);

  bm.add(strapiRef, {
    label: userOptions.blockLabel,
    category: userOptions.blockLabel,
    attributes: { class: 'fa fa-clock' },
    content: `
        <img data-gjs-type="${strapiRef}" />
        ${style}
      `,
  });
}
