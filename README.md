# strapi-plugin-webpage-builder
Add GrapesJS builder to your own strapi application

# Setup
Install package
```sh
npm i --save strapi-plugin-webpage-builder
# or
yarn add strapi-plugin-webpage-builder
```

Create or edit `your-project/admin/admin.config.js` and add sass loader (which is required by GrapesJS)
```javascript
module.exports = {
  webpack: (config, webpack) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    // Allow scss modules
    config.resolve = { ...config.resolve, extensions: [...config.resolve.extensions, '.scss'] };

    // Configure a SASS loader
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
          },
        },
      ],
    });

    return config;
  },
};
```

Edit your model(e.g. the model that'll handle web builder field) controllers (`your-project/api/your-model/controllers/your-model.js`).
> At the time of this release, strapi does not allow to add custom private fields to model so all the data required to init editor will be stored in your model. The following step prevent useless data to be returned on get requests:
```javascript
'use strict';
const { sanitizeEntity } = require('strapi-utils');

const cleanupEntity = (entity) => {
  const { content } = entity;

  return { ...entity, content: { html: content.html, css: content.css } };
};

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.yourModel.search(ctx.query); /* eslint-disable-line no-undef */
    } else {
      entities = await strapi.services.yourModel.find(ctx.query); /* eslint-disable-line no-undef */
    }

    return entities.map((entity) => {
      return sanitizeEntity(cleanupEntity(entity), { model: strapi.models.yourModel } /* eslint-disable-line no-undef */);
    });
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.yourModel.findOne({ id }); /* eslint-disable-line no-undef */

    return sanitizeEntity(cleanupEntity(entity), { model: strapi.models.yourModel } /* eslint-disable-line no-undef */);
  },
};
```
> NB: this code assumes that you named a field `content` with type `json` in model `yourModel`
