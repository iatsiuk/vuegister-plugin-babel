'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;
const transform = require('../');

describe('vuegister-plugin-babel', () => {
  // helpers
  let dir = __dirname + '/fixtures/';
  let file = (name) => {
    let data = fs.readFileSync(dir + name, 'utf8');

    return path.extname(name) === '.json' ?
           JSON.parse(data) :
           data;
  };

  it('transform', () => {
    let generated = transform(file('original.js'), {}).code;

    assert.strictEqual(generated, file('generated.js'));
  });

  it('source map', () => {
    let generated = transform(file('original.js'), {maps: true}).map;

    assert.deepEqual(generated, file('map.json'));
  });
});
