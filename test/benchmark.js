const test = require("ava");
const fs = require("fs");
const os = require("os");
const {performance} = require('perf_hooks');

const wrap = require("../index.js");

test("wrap faster than others", t => {
    t.log(`${os.cpus()[0].model}`);

    const str = fs.readFileSync("test/el-inmortal-jorge-luis-borges-fragment.txt").toString();
    const cpl = 80;

    const N = 10000;
    t.log(`wrapping ${N} times with each package a fragment of \"El inmortal\" by Jorge Luis Borges...`);

    // wrap with wordwrap
    const wrap_wordwrap = require("wordwrap")(cpl + 1); // it looks like it takes the newline into account
    t0 = performance.now();
    wordwrap = "";
    for (let n = 0; n < N; ++n) {
        wordwrap = wrap_wordwrap(str);
    }
    time_wordwrap = performance.now() - t0;
    t.log(`wordwrap took ${time_wordwrap.toFixed(2)} ms`);

    // wrap with wrap-text
    const wrap_wrap_dash_text = require("wrap-text");
    t0 = performance.now();
    wrap_dash_text = "";
    for (let n = 0; n < N; ++n) {
        let partials = [];
        for (p of str.split("\n").filter(s => s)) {
            partials.push(wrap_wrap_dash_text(p, cpl - 1)); // with "cpl - 1" i have the string wrapped at "cpl" characters per line...I don't know why
            partials.push("\n");
        }
        wrap_dash_text = partials.join("");
    }
    time_wrap_dash_text = performance.now() - t0;
    t.log(`wrap-text took ${time_wrap_dash_text.toFixed(2)} ms`);

    // wrap with word-wrap
    const wrap_word_dash_wrap = require("word-wrap");
    t0 = performance.now();
    word_dash_wrap = "";
    for (let n = 0; n < N; ++n) {
        word_dash_wrap = wrap_word_dash_wrap(str, {indent: "", trim: true, width: cpl});
    }
    time_word_dash_wrap = performance.now() - t0;
    t.log(`word-wrap took ${time_word_dash_wrap.toFixed(2)} ms`);

    // wrap with fast-word-wrap
    t0 = performance.now();
    result = "";
    for (let n = 0; n < N; ++n) {
        partials = [];
        for (p of str.split("\n").filter(s => s)) {
            partials.push(wrap(p, cpl));
        }
        result = partials.join("");
    }
    time = performance.now() - t0;
    t.log(`fast-word-wrap took ${time.toFixed(2)} ms`);

    const expected = fs.readFileSync("test/golden-master.txt").toString();

    // check correctness
    t.is(result, expected);
    t.is(wordwrap, expected);
    t.is(word_dash_wrap + "\n", expected); // newline added because word-wrap doesn't append one at the end of the output
    t.is(wrap_dash_text, expected);

    // check performance
    t.true(time < time_wordwrap);
    t.true(time < time_word_dash_wrap);
    t.true(time < time_wrap_dash_text);
});
