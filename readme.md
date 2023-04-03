# fast-word-wrap

a fast and simple node.js package for getting a paragraph wrapped at a fixed line length

`fast-word-wrap` has been proven (see [benchmark](#benchmark)) to be faster than [wordwrap](https://github.com/substack/node-wordwrap) (28x), [wrap-text](https://github.com/IonicaBizau/wrap-text) (10x) and [word-wrap](https://github.com/jonschlinkert/word-wrap) (8x)

## toc

- [installation](#installation)
- [usage](#usage)
  * [wrapping strings containing newlines](#wrapping-strings-containing-newlines)
- [testing](#testing)
  * [unit](#unit)
  * [benchmark](#benchmark)
  * [about the sample text and the golden master](#about-the-sample-text-and-the-golden-master)

## installation

```console
$ npm install fast-word-wrap
```

## usage

```js
const wrap = require("fast-word-wrap");

const str = "The quick brown fox jumps over the lazy dog."; // the newline-free string to wrap
const cpl = 10; // the maximum number of characters per line

result = wrap(str, cpl);

console.log(result); // "The quick\nbrown fox\njumps over\nthe lazy\ndog.\n"
```

outputs

```console
The quick
brown fox
jumps over
the lazy
dog.
```

### wrapping strings containing newlines

`fast-word-wrap` won't work correctly if the input string contains newlines; if that's the case, simply do

```js
partials = [];
for (p of str.split("\n").filter(s => s)) {
    partials.push(wrap(p, cpl));
}

result = partials.join("");
```

## testing

### unit

```console
$ npm test test/unit.js
```

outputs

```console

> fast-word-wrap@1.1.0 test
> ava --verbose "test/unit.js"


  ✔ no wrap
    ℹ The quick brown fox jumps over the lazy dog.
      
  ✔ wrap
    ℹ The quick
      brown fox
      jumps over
      the lazy
      dog.

  ✔ do your best
    ℹ The
      quick
      brown
      fox
      jumps
      over
      the
      lazy
      dog.
      
  ✔ wrap a fragment of "El inmortal" by Jorge Luis Borges
    ℹ [output omitted for brevity in readme]
      
  ─

  4 tests passed
```

### benchmark

```console
$ npm test test/benchmark.js
```

outputs in my laptop

```console

> fast-word-wrap@1.1.0 test
> ava --verbose test/benchmark.js


  ✔ wrap faster than others (2.5s)
    ℹ 11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz
    ℹ wrapping 10000 times with each package a fragment of "El inmortal" by Jorge Luis Borges...
    ℹ wordwrap took 1500.74 ms
    ℹ wrap-text took 532.84 ms
    ℹ word-wrap took 506.52 ms
    ℹ fast-word-wrap took 47.02 ms
  ─

  1 test passed
```

![barh](https://github.com/alepinio/fast-word-wrap/blob/assets/barh.png)

### about the sample text and the golden master

the fragment used for testing is a transcription I did from my copy of "Nueva antología personal" by Jorge Luis Borges (ed. Emecé, 1st edition, 1968); I manually wrapped it at 80 characters per line to get the golden master
