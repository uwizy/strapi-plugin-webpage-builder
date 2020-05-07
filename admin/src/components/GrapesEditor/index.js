import React, { useEffect, useState } from 'react'; // eslint-disable-line import/no-unresolved
import PropTypes from 'prop-types';
import GrapesJS from 'grapesjs';
import gjsBasicBlocks from 'grapesjs-blocks-basic'; // eslint-disable-line no-unused-vars
import { useStrapi, prefixFileUrlWithBackendUrl } from 'strapi-helper-plugin'; // eslint-disable-line import/no-unresolved
import './assets/scss/main.scss';
import addStrapiPlugin from './grapes-plugins/strapi';
import { strapiPluginRef } from './grapes-plugins/strapi/consts';
import { deviceManagerConfig } from './config/device-manager.config';
import { styleManagerConfig } from './config/style-manager.config';
import { storageManagerConfig } from './config/storage-manager.config';
import { editorConfig } from './config/editor.config';
import './assets/js/fa-shim';

// DEV note: Many dependencies use FA
// Grapes has an older version
// Strapi* use newer version which wraps icons in svg element
// Doing so breaks grapes' toolbar callbacks
// This dirty argument is here to nest svg in original element
// instead of just replacing
window.FontAwesome.config.autoReplaceSvg = 'nest';

const Editor = ({ onChange, name, value }) => {
  const [mediaLibConfiguration, setMediaLibConfiguration] = useState({ open: false });
  const toggleMediaLib = () =>
    setMediaLibConfiguration((prev) => {
      return { ...prev, open: !prev.open };
    });
  const [editor, setEditor] = useState();
  const [editorConfigured, setEditorConfigured] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pluginsLoaded, setPluginsLoaded] = useState(false);
  const [mediaLibPickedData, setMediaLibPickedData] = useState(null);
  const [onFilePickedListeners, setOnFilePickedListeners] = useState({});
  const [sharedAssetsManager, setSharedAssetsManager] = useState(null);
  const {
    strapi: {
      componentApi: { getComponent },
    },
  } = useStrapi();

  const MediaLibComponent = getComponent('media-library').Component;

  const onMediaLibInputChange = (localData) => {
    if (localData) {
      const { url } = localData;
      setMediaLibPickedData({ ...localData, url: prefixFileUrlWithBackendUrl(url) });
    }
  };

  const onMediaLibClosed = () => {
    if (mediaLibPickedData) {
      const { url, alternativeText, id } = mediaLibPickedData;

      if (onFilePickedListeners && url) {
        const registeredListener = onFilePickedListeners[mediaLibConfiguration.activeImageId];

        if (registeredListener) {
          registeredListener.call({ url, alternativeText, strapiId: id });
        }
      }
    }

    setMediaLibConfiguration({ open: false });

    setMediaLibPickedData(null);
  };

  useEffect(() => {
    if (!pluginsLoaded) {
      addStrapiPlugin();
      setPluginsLoaded(true);

      setSharedAssetsManager({
        open: (blockId, galleryId) => {
          setMediaLibConfiguration({ open: true, activeImageId: blockId, selected: { id: galleryId } });
        },
        close: () => onMediaLibClosed(),
        onFilePicked: (fileId, cbk) =>
          setOnFilePickedListeners((previousListeners) => {
            return { ...previousListeners, [fileId]: cbk };
          }),
      });
    }
  }, [setPluginsLoaded]);

  useEffect(() => {
    if (mounted || !pluginsLoaded || !sharedAssetsManager) {
      return;
    }

    // const { components: componentsStringified, styles: stylesStringified } = JSON.parse(value) || {
    //   components: '{}',
    //   styles: '{}',
    // };
    // const components = JSON.parse(componentsStringified);
    // const styles = JSON.parse(stylesStringified);
    // Original props here https://github.com/artf/grapesjs/blob/master/src/editor/config/config.js
    setEditor(
      GrapesJS.init({
        container: '#gjs',
        height: '500px',
        width: 'auto',
        // Rendered data
        components: (value && value.components) || {},
        style: (value && value.styles) || {},
        storageManager: storageManagerConfig,
        plugins: ['gjs-blocks-basic', strapiPluginRef],
        pluginsOpts: {
          'gjs-blocks-basic': {
            blocks: ['column1', 'column2', 'column3', 'column3-7', 'text'],
            category: 'Basic Blocks',
            flexGrid: true,
          },
          [strapiPluginRef]: {
            assetsManager: sharedAssetsManager,
          },
        },
        wrapperIsBody: false,
        styleManager: styleManagerConfig,
        deviceManager: deviceManagerConfig,
        ...editorConfig,
      })
    );
    setMounted(true);
  }, [value, mounted, pluginsLoaded]);

  useEffect(() => {
    if (!mounted || editorConfigured) {
      return;
    }

    editor.setDevice('Desktop');
    editor.Panels.removeButton('options', 'export-template');

    editor.on('storage:store', function (e) {
      // When store is called, trigger strapi onChange callback

      onChange({
        target: {
          name,
          value: {
            components: JSON.parse(e.components),
            styles: JSON.parse(e.styles),
            css: e.css,
            html: e.html,
          },
        },
      });
      setEditorConfigured(true);
    });
  }, [mounted, editor, editorConfigured, sharedAssetsManager]);

  return (
    <form
      // DEV note:
      // When you're in an input of the editor and press enter,
      // Strapi model form is submitted.
      // This is not a definitive solution, just a patch to prevent
      // such behavior.
      //
      // It will result in a warning:
      // "Warning: validateDOMNesting(...): <form> cannot appear as a descendant of <form>."
      onSubmit={(evt) => {
        evt.stopPropagation();
        evt.preventDefault();
      }}
    >
      {MediaLibComponent && mediaLibConfiguration.selected && (
        <MediaLibComponent
          allowedTypes={['images']}
          isOpen={mediaLibConfiguration.open}
          multiple={false}
          noNavigation={false}
          selectedFiles={[mediaLibConfiguration.selected]}
          onClosed={onMediaLibClosed}
          onInputMediaChange={onMediaLibInputChange}
          onToggle={toggleMediaLib}
        />
      )}
      <div id="gjs" />
    </form>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.object,
};

export default Editor;
