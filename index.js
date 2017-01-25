'use strict';

const babel = require('babel-core');
const generateMap = require('vuegister').generateSourceMap;

/**
 * Transforms given code to the JavaScript.
 *
 * @function transform
 * @param {string} code - Code for transformation.
 * @param {object} opts - Options, an object of the following format:
 * {
 *    file: string,      // 'unknown', file name
 *    maps: boolean,     // false, provide source map
 *    mapOffset: number, // 0, map offset
 *    debug: boolean,    // false, print debug
 *    extra: object,     // {}, Babel options
 * }
 * @return {object} - Returns transpiled code, an object of the
 * following format:
 * {
 *    code: string, // transpiled JavaScript
 *    map: object,  // generated source map
 * }
 */
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
        debug: opts.debug,
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
