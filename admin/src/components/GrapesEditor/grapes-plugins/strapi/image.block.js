import { useEffect, useState } from 'react'; // eslint-disable-line import/no-unresolved

export const StrapiImageBlock = ({ assetsManager, model, imgRef }) => {
  const [image, setImage] = useState({
    src:
      model.attributes.image.src ||
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+',
    alt: model.attributes.image.alt || 'Alt text',
  });

  const [assetsManagerMounted, setAssetsManagerMounted] = useState(false);

  const onFilePickedCallback = (imageData) => {
    setImage(imageData);
    model.attributes.image = imageData;

    model.setAttributes({ src: imageData.src, alt: imageData.alt });
    // data-highlightable="false" data-gjs-editable="false" data-gjs-removable="false" draggable="false" alt="${alternativeText}" style="max-width: '100%';" />`);
  };

  useEffect(() => {
    if (!assetsManagerMounted && model) {
      // Be careful: if you pass the callback function without nesting
      // it in an object it will be executed directly
      assetsManager.onFilePicked(model.ccid, { call: onFilePickedCallback });
      setAssetsManagerMounted(true);
    }
  }, [assetsManager, model]);

  useEffect(() => {
    imgRef.src = image.src;
    imgRef.alt = image.alt;
  }, [image]);

  return null;
};
