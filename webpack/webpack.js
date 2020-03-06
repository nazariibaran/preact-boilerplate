const path = require('path');
const merge = require('deepmerge');
/**
 * Get path from root dir
 */
const root = pathname => path.join(__dirname, '../' + pathname);

/**
 * App Entries
 */
const entry = [root('src/index.tsx')];

/**
 * Use loader
 */
const use = (loader, options = {}) => ({
  loader,
  options
});

/**
 * Is production env
 */
const production = process.env.NODE_ENV === 'production';

/**
 * Get enviroment
 */
const enviroment = () => {
  const name = process.env.STAGE_NAME || 'dev';

  return merge(
    require(`../config/${name}.json`),
    require('../config/local.json')
  );
};

/**
 * Add process env prefix
 */
const toProcessEnv = source =>
  Object.entries(source).reduce((result, [key, value]) => {
    return {
      ...result,
      [`process.env.${key}`]: JSON.stringify(value)
    };
  }, {});

/**
 * Loader for image files
 */
const images = ({ optimize = true } = {}) => ({
  test: /\.(svg|jpg|jpeg|png)$/,
  use: [
    use('file-loader', {
      name: 'img/[name].[ext]'
    }),
    use(
      'image-webpack-loader',
      optimize
        ? {
            pngquant: {
              quality: '90',
              speed: 4
            },
            mozjpeg: {
              progressive: true,
              quality: 70
            },
            svgo: {}
          }
        : {}
    )
  ]
});

module.exports = {
  root,
  entry,
  images,
  use,
  production,
  enviroment,
  toProcessEnv
};
