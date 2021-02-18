const test = require("ava");
const fs = require("fs");

const wrap = require("../index.js");

test("no wrap", t => {
    const str = "The quick brown fox jumps over the lazy dog."
    const cpl = str.length;

    const result = wrap(str, cpl);

    const expected = str + "\n";

    t.is(result, expected);

    t.log(result);
});

test("wrap", t => {
    const str = "The quick brown fox jumps over the lazy dog."
    const cpl = 10;

    const result = wrap(str, cpl);

    const expected = "The quick\nbrown fox\njumps over\nthe lazy\ndog.\n";

    t.is(result, expected);

    t.log(result);
});

test("do your best", t => {
    const str = "The quick brown fox jumps over the lazy dog."
    const cpl = 3;

    const result = wrap(str, cpl);

    const expected = "The\nquick\nbrown\nfox\njumps\nover\nthe\nlazy\ndog.\n";

    t.is(result, expected);

    t.log(result);
});

test("wrap a fragment of \"El inmortal\" by Jorge Luis Borges", t => {
    const str = fs.readFileSync("test/el-inmortal-jorge-luis-borges-fragment.txt").toString();
    const cpl = 80;

    let partials = [];
    for (p of str.split("\n").filter(s => s)) {
        partials.push(wrap(p, cpl));
    }
    const result = partials.join("");

    const expected = fs.readFileSync("test/golden-master.txt").toString();

    t.is(result, expected);

    t.log(result);
});
