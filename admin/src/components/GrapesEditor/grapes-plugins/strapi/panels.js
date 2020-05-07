/**
 * Adds (bell) button to options panel to call loadHtmltemplate command
 */
import { loadHtmltemplate } from './consts';

export default (editor, config) => {
  const pn = editor.Panels;

  pn.addButton('options', {
    id: loadHtmltemplate,
    className: 'fa fa-bell',
    command: (e) => e.runCommand(loadHtmltemplate),
  });
};
