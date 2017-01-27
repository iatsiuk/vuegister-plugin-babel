'use strict';

const babel = require('babel-core');
const generateMap = require('vuegister')._.generateSourceMap;

module.exports = (code, opts) => {
  let cfg = {
    babelrc: false,
    ast: false,
    sourceFileName: opts.file,
    sourceMaps: opts.maps,
    inputSourceMap: null,
    presets: [
      ['env', {
        targets: {node: 'current'},
      }],
    ],
  };

  if (opts.mapOffset > 0) {
    cfg.inputSourceMap = generateMap(code, opts.file, opts.mapOffset);
  }
  Object.assign(cfg, opts.extra);

  let transformed;

  try {
    transformed = babel.transform(code, cfg);
  } catch (err) {
    console.error('Failed to transform given code.');
    console.error(err);

    process.exit(1);
  }

  return {code: transformed.code, map: transformed.map};
};
