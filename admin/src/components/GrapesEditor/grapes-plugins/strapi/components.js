import React from 'react';
import ReactDOM from 'react-dom';
import { strapiRef } from './consts';
import { StrapiImageBlock } from './image.block';

export default function (editor, userOptions = {}) {
  const editorDomComponents = editor.DomComponents;
  const defaultType = editorDomComponents.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  editorDomComponents.addType(strapiRef, {
    model: defaultModel.extend(
      {
        defaults: {
          ...defaultModel.prototype.defaults,
          assetsManager: userOptions.assetsManager,
          reactComponentsManager: userOptions.reactComponentsManager,
          image: {
            url: userOptions.url,
            alternativeText: userOptions.alternativeText,
          },
          attributes: {
            class: 'strapi-block',
          },
          droppable: false,
          editable: true,
          highlightable: true,
          selectable: true,
          hoverable: true,
        },
      },
      {
        isComponent(el) {
          if (
            (el.getAttribute && el.getAttribute('data-gjs-type') === strapiRef) ||
            (el.attributes && el.attributes['data-gjs-type'] === strapiRef)
          ) {
            return {
              type: strapiRef,
            };
          }
        },
      }
    ),

    view: defaultView.extend({
      events: {
        dblclick: 'onActive',
      },
      init() {
        // Listen to changes  managed by the traits
        this.listenTo(this.model, '', this.handleChanges);
      },
      handleChanges(e) {
        /// Force rerender of react element
        ReactDOM.unmountComponentAtNode(this.el);
        this.render();
      },
      onActive(ev) {
        this.model.attributes.assetsManager.open(this.model.ccid);
      },
      onRender({ el }) {
        // Generate the block that'll be show in canvas
        ReactDOM.render(
          <StrapiImageBlock imgRef={el} assetsManager={this.model.attributes.assetsManager} model={this.model} />,
          el
        );
      },
    }),
  });
}
