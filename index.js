'use strict';

const path = require('path');
const babel = require('babel-core');
const generateMap = require('vuegister').generateSourceMap;

function transform(script, file, cfg) {
  let inputMap = cfg.inputSourceMap ?
                 generateMap(script.content, file, script.start - 1) :
                 null;
  let transformed;

  try {
    transformed = babel.transform(script.content, {
      babelrc: false,
      ast: false,
      sourceRoot: path.dirname(file),
      sourceFileName: file,
      inputSourceMap: inputMap,
      sourceMaps: cfg.sourceMaps ? 'inline' : cfg.sourceMaps,
      presets: [
        ['env', {
          targets: {node: 'current'},
        }],
      ],
    });
  } catch (err) {
    console.error(err);

    process.exit(1);
  }

  return transformed.code;
}

module.exports = transform;
