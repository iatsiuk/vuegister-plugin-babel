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
 *    plugins: object,   // {}, Babel options
 * }
 * @return {string} - Returns transpiled JavaScript code.
 */
module.exports = (code, opts) => {
  let cfg = {
    babelrc: false,
    ast: false,
    sourceFileName: opts.file,
    sourceMaps: opts.maps ? 'inline' : false,
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
  Object.assign(cfg, opts.babel);

  let transformed;

  try {
    transformed = babel.transform(code, cfg);
  } catch (err) {
    console.error('Failed to transform given code.');
    console.error(err);

    process.exit(1);
  }

  return transformed.code;
};
