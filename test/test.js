'use strict';

const fs = require('fs');
const assert = require('chai').assert;
const transform = require('../');

describe('vuegister-plugin-babel', () => {
  let file = (name) => {
    return fs.readFileSync(__dirname + '/fixtures/' + name, 'utf8');
  };

  it('transform', () => {
    let generated = transform(file('original.js'), {});

    assert.strictEqual(generated, file('generated.js'));
  });

  it('source map', () => {
    let map = '//# sourceMappingURL=data:application/json;base64';
    let generated = transform(file('original.js'), {maps: true});

    assert.include(generated, map);
  });
});
