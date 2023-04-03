/** @type {(s: string, b: number) => string} */
function wrap(str, cpl) {
    // compute input string length
    const len = str.length;

    // create array to store wrapped strings
    let lines = [];

    // do that thing you do
    if (len <= cpl) {
        // low-hanging fruit: nothing to wrap
        lines.push(str);
    } else {
        // next extraction start index
        let start = 0;

        // extract strings from input string as long as more than "cpl"
        // characters remain to be extracted
        while (len - start > cpl) {
            // compute next extraction end index (i.e. the index of the last
            // character of the last word that wholly fits in a line of "cpl"
            // characters length)
            let end = 0;
            for (let i = start + cpl; i > start; --i) {
                if (str[i] == " ") {
                    end = i;
                    break;
                }
            }

            // if there's a word with more than "cpl" characters there's nothing
            // we can do to avoid breaking the limit of "cpl" characters per
            // line, so let's put it alone in a line and keep going
            if (end == 0) {
                for (let i = start + cpl; i < len; ++i) {
                    if (str[i] == " ") {
                        end = i;
                        break;
                    }
                }

                // this is needed here to handle the case when the word with
                // more than "cpl" characters is the last one of the input
                // string (note that the previous cycle won't set "end" that
                // being the case)
                if (end == 0) {
                    end = len;
                    break;
                }
            }

            // store string between start and end indices
            lines.push(str.substring(start, end));

            // next extraction start index is one index past last extraction end
            // index
            start = end + 1;
        }

        // append string with the remaining characters
        lines.push(str.substring(start, len));
    }

    // add empty element just to get a newline at string end after joining
    lines.push("");

    // compute result string
    let result = lines.join("\n");

    return result;
}

module.exports = wrap;
