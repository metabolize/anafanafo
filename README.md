# anafanafo

[![version](https://img.shields.io/npm/v/anafanafo?style=flat-square)][npm]
[![license](https://img.shields.io/npm/l/anafanafo?style=flat-square)][npm]
[![build](https://img.shields.io/circleci/project/github/metabolize/anafanafo/main?style=flat-square)][build]
[![bundle size](https://img.shields.io/bundlephobia/minzip/anafanafo?style=flat-square)][bundlephobia]
[![code style](https://img.shields.io/badge/code_style-prettier-ff69b4?style=flat-square)][prettier]
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff?style=flat-square)][lerna]

[npm]: https://npmjs.com/anafanafo
[build]: https://circleci.com/gh/metabolize/anafanafo/tree/main
[bundlephobia]: https://bundlephobia.com/result?p=anafanafo
[prettier]: https://prettier.io/
[lerna]: https://lernajs.io/

This repo contains three related npm packages:

- [char-width-table-builder][], which builds character-width tables using
  [Puppeteer][].
- [char-width-table-consumer][], which efficiently computes text width using a
  character-width table.
- [anafanafo][], which computes text width for Verdana and Helvetica.

These have been built with [Shields][] in mind.

(And because Verdana always makes me think of [this][the name game].)

[char-width-table-builder]: packages/char-width-table-builder
[char-width-table-consumer]: packages/char-width-table-consumer
[anafanafo]: packages/anafanafo
[puppeteer]: https://pptr.dev/
[shields]: https://github.com/badges/shields/
[the name game]: https://www.youtube.com/watch?v=5MJLi5_dyn0

## Usage

```js
const anafanafo = require('anafanafo')

const width = anafanafo('Shirley Shirley')
```

## License

All rights to Verdana are owned by Microsoft Corp.

The remainder of this project is licensed under the MIT license.
