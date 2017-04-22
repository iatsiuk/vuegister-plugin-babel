# vuegister-plugin-babel [![npm version](https://badge.fury.io/js/vuegister-plugin-babel.svg)](https://badge.fury.io/js/vuegister-plugin-babel) [![build status](https://travis-ci.org/iatsiuk/vuegister-plugin-babel.svg?branch=master)](https://travis-ci.org/iatsiuk/vuegister-plugin-babel)

[![Greenkeeper badge](https://badges.greenkeeper.io/iatsiuk/vuegister-plugin-babel.svg)](https://greenkeeper.io/)

[Vuegister](https://github.com/iatsiuk/vuegister) plugin for Babel.

Issues with the output should be reported on the Babel [issue tracker](https://phabricator.babeljs.io/).

## Install

```sh
npm i vuegister-plugin-babel -D
```

## Test suite example

To run test suite create `test.js` and `MyComponent.vue` files inside your `test` folder.

Content of the `test.js` file:

```js
const assert = require('chai').assert;
const Vue = require('vue/dist/vue.common')
const MyComponent = require('./MyComponent.vue').default

describe('MyComponent', () => {
  it('has a created hook', () => {
    assert.isFunction(MyComponent.created)
  })

  it('sets the correct default data', () => {
    assert.isFunction(MyComponent.data)
    const defaultData = MyComponent.data()
    assert.strictEqual(defaultData.message, 'hello!')
  })

  it('correctly sets the message when created', () => {
    const vm = new Vue(MyComponent).$mount()
    assert.strictEqual(vm.message, 'bye!')
  })
})
```

Content of the `MyComponent.vue` file:

```html
<template>
  <span>{{ message }}</span>
</template>
<script lang="babel">
  export default {
    data () {
      return {
        message: 'hello!'
      }
    },
    created () {
      this.message = 'bye!'
    }
  }
</script>
```

Install jsdom-global and run tests with:

```sh
npm i jsdom jsdom-global -D
mocha -r jsdom-global/register -r vuegister/register
```

## Caveats

Babel [transpiles](https://github.com/babel/babel/issues/2212) this code:

```js
export default {
  data () {
    return {
      message: 'hello!'
    }
  }
}
```

into this:

```js
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data() {
    return {
      message: 'hello!'
    };
  }
};
```

So now you have to call `.default` in Node.js code:

```js
var foo = require('foo').default
```

## Tests

To run the test suite, install development dependencies and execute:

```sh
npm run coverage
```

## License

Distributed under MIT License.
