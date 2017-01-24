'use strict';

const fs = require('fs');
const assert = require('chai').assert;
const transform = require('../');

describe('vuegister-plugin-babel', () => {
  it('transform', () => {
    let origFile = __dirname + '/fixtures/original.js';
    let genFile = __dirname + '/fixtures/generated.js';
    let original = fs.readFileSync(origFile, 'utf8');
    let generated = fs.readFileSync(genFile, 'utf8');
    let result = transform({content: original}, origFile, {sourceMaps: false});

    assert.strictEqual(result, generated);
  });

  it('source map', () => {
    let origFile = __dirname + '/fixtures/original.js';
    let original = fs.readFileSync(origFile, 'utf8');
    let result = transform({content: original}, origFile, {sourceMaps: true});

    assert.include(result, '//# sourceMappingURL=data:application/json');
  });
});
