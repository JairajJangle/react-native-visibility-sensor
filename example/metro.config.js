const path = require('path');
const escape = require('escape-string-regexp');
const { getDefaultConfig } = require('@expo/metro-config');
const pak = require('../package.json');

const root = path.resolve(__dirname, '..');
const modules = Object.keys({ ...pak.peerDependencies });

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  ...defaultConfig,

  projectRoot: __dirname,
  watchFolders: [root],

  // We need to make sure that only one version is loaded for peerDependencies
  // So we block them at the root, and alias them to the versions in example's node_modules
  resolver: {
    ...defaultConfig.resolver,

    blockList: (() => {
      const customBlockList = modules.map(
        (m) =>
          new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)
      );

      const defaultBlockListSource = defaultConfig.resolver.blockList.source;
      const customSources = customBlockList.map((re) => re.source).join('|');
      const fullSource = customSources
        ? `${defaultBlockListSource}|${customSources}`
        : defaultBlockListSource;

      // Preserve the original flags (usually empty or 'i')
      const flags = defaultConfig.resolver.blockList.flags || '';
      return new RegExp(fullSource, flags);
    })(),

    extraNodeModules: modules.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name);
      return acc;
    }, {}),
  },
};

module.exports = config;
