'use strict';

const babel = require('babel-core');
const generateMap = require('vuegister')._generateMap;

/**
 * Transforms given code to JavaScript.
 *
 * @function transform
 * @param {string} code - Code for the transpiler.
 * @param {object} opts - Options, an object of the following format:
 * ```js
 * {
 *   file: string,      // 'unknown', file name
 *   maps: boolean,     // false, provide source map
 *   mapOffset: number, // 0, map offset
 *   extra: object,     // {}, plugin options from the user
 * }
 * ```
 * @return {object} Returns the following object:
 * ```js
 * {
 *   code: string, // transpiled code, JavaScript
 *   map: object,  // generated source map
 * }
 * ```
 */
module.exports = (code, opts) => {
  let cfg = {
    babelrc: false,
    ast: false,
    filename: opts.file,
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

  let transformed = babel.transform(code, cfg);

  return {code: transformed.code, map: transformed.map};
};
