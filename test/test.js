'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;
const transform = require('../');

// absolute path to fixtures folder
let dir = __dirname + '/fixtures/';

describe('vuegister-plugin-babel', () => {
  it('transform', () => {
    let generated = transform(file('original.js'), {}).code;

    assert.strictEqual(generated, file('generated.js'));
  });

  it('source map', () => {
    let generated = transform(file('original.js'), {
      maps: true,
      file: 'original.js',
    }).map;

    assert.deepEqual(generated, file('map.json'));
  });

  it('source map offset', () => {
    let generated = transform(file('original.js'), {
      maps: true,
      file: 'original.js',
      mapOffset: 5,
    });

    assert.deepEqual(generated, file('map-offset.json'));
  });
});

// reads file from fixtures folder
function file(name, scope) {
  let data = fs.readFileSync(dir + name, 'utf8');

  if (scope) {
    data = template(data, scope);
  }

  return path.extname(name) === '.json' ?
          JSON.parse(data) :
          data;
}

// simple template engine
function template(str, scope) {
  return str.replace(/<%(.+?)%>/g, (p1, p2) => {
    // p1..pn here is parenthesized substring matches
    p2 = p2.trim();

    if (Object.prototype.hasOwnProperty.call(scope, p2)) {
      return typeof scope[p2] === 'function' ?
            scope[p2]() :
            scope[p2];
    }

    return p1;
  });
}
