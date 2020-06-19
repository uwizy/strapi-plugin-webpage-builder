import grapesjs from 'grapesjs';
import loadComponents from './components';
import loadBlocks from './blocks';
import loadPanels from './panels';

import { strapiRef, strapiPluginRef } from './consts';

export default function addStrapiPlugin() {
  grapesjs.plugins.add(strapiPluginRef, (editor, userOptions = {}) => {
    const defaults = {
      blocks: [strapiRef],

      // Label in block
      blockLabel: 'Strapi',

      // Category in block
      blockCategory: 'Extra',

      // Default style
      defaultStyle: true,
      assetsManager: null,
    };

    // Load defaults
    for (const name in defaults) {
      if (!(name in userOptions)) userOptions[name] = defaults[name];
    }

    // Add components
    loadComponents(editor, userOptions);

    // Add components
    loadBlocks(editor, userOptions);

    // Load panels
    loadPanels(editor, userOptions);

    // Show the blocks panel by default
    editor.on('load', () => {
      const openBlocksPanel = editor.Panels.getButton('views', 'open-blocks');
      openBlocksPanel && openBlocksPanel.set('active', 1);
      // editor.runCommand('open-blocks');
    });
  });
}
