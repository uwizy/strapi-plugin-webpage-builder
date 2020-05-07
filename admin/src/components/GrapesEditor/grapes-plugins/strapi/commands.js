/**
 * Adds loadHtmltemplate command
 */
import { loadHtmltemplate } from './consts';

export default (editor, config) => {
  const cm = editor.Commands;

  cm.add(loadHtmltemplate, (e) => {
    const pHtml = e.getModel().get('Parser').parserHtml;
    // JSX expression in attributes are quoted, so unquote them before passing on
    const html = pHtml.unquoteJsxExpresionsInAttributes(e.getHtml());
    config.setHtmlString(html);
    config.setCssString(e.getCss());
  });
};
