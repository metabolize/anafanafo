# anafanafo

[![version](https://img.shields.io/npm/v/anafanafo.svg?style=flat-square)][npm]
[![license](https://img.shields.io/npm/l/anafanafo.svg?style=flat-square)][npm]
[![build](https://img.shields.io/circleci/project/github/metabolize/anafanafo.svg?style=flat-square)][build]
[![code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)][prettier]

[npm]: https://npmjs.com/anafanafo
[build]: https://circleci.com/gh/metabolize/anafanafo/tree/master
[prettier]: https://prettier.io/

Efficiently compute text width in 110 pt Verdana using [char-width-table-consumer][]
and a lookup table.

Built with [Shields][] in mind.

(And because Verdana always makes me think of [this][the name game].)

[char-width-table-consumer]: https://github.com/metabolize/char-width-table-consumer/
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
