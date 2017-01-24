# vuegister-plugin-babel [![Build Status](https://travis-ci.org/iatsiuk/vuegister-plugin-babel.svg?branch=master)](https://travis-ci.org/iatsiuk/vuegister-plugin-babel)

[Vuegister](https://github.com/iatsiuk/vuegister) plugin for Babel.

> Issues with the output should be reported on the Babel [issue tracker](https://phabricator.babeljs.io/).

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

into

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

So you have to do something like this:

```js
const MyComponent = require('./MyComponent.vue').default
```

## Install

```sh
npm install --save-dev vuegister-plugin-babel
```

## Tests

To run the test suite, install development dependencies and execute Mocha inside the vuegister-plugin-babel folder.

## License

Distributed under MIT License.
