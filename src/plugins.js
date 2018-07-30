const HtmlParseTag = require('html-parse-stringify');
let methods = {
    init(str) {
        let res = this.format(str);
        return res;
    },
    format(str) {
        return HtmlParseTag.parse(str);
    }
};

module.exports = methods;
