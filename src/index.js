/**
 * @file 格式化 单vue组件 文件
 * @author fe_bean
 */
const {
    window,
    Position,
    Range,
    workspace
} = require('vscode');
const beautify = require('js-beautify');
const pugBeautify = require('pug-beautify');
const {
    breakTagAttr
} = require('./plugins');
let defaultConf = require('../js-beautify.conf');

let editor;
let htmlUnFormat = [
    'a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite',
    'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img',
    'input', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript',
    'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', /* 'script', */ 'select', 'small',
    'span', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'var',
    'video', 'wbr', 'text',
    // prexisting - not sure of full effect of removing, leaving in
    'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt',
];

let methods = {
    doc: null,
    text: '',
    newText: '',
    lineCount: 1,
    jsBeautifyConf: defaultConf['js-beautify'],
    pugBeautifyConf: defaultConf['pug-beautify'],
    editorConf: {},
    init() {
        // 活动窗口tab
        editor = window.activeTextEditor;
        if (!editor) throw new Error('no active editor');
        // 当前窗口document
        this.doc = editor.document;
        // 获取配置
        this.getConfig();

        // 行数
        this.lineCount = this.doc.lineCount;
        // 内容
        this.text = this.doc.getText();
        // 每次执行清空格式化后的内容
        this.newText = '';
        // 分别处理 html(pug)、css、js
        this.splitContent(this.text);
        // 内容回写到文件
        this.writeFile();
    },
    splitContent(text) {
        let formatNeed = this.vueFormatConf.format_need || ['html', 'js', 'css'];

        let htmlText = text.match(/<template[\w\W]+<\/template>\s?/);
        let jsText = text.match(/<script[\w\W]+<\/script>\s?/);
        let cssText = text.match(/<style[\w\W]+<\/style>\s?/);

        if (htmlText && formatNeed.includes('html')) {
            text = text.replace(htmlText[0], this.beautyHtml(htmlText[0]) + '\n');
        }
        if (jsText && formatNeed.includes('js')) {
            let jsArr = jsText[0].split(/<\/script>\n*/);
            jsArr.forEach((item, index) => {
                let pre = '';
                if (index === 0) {
                    pre = '\n';
                }
                let str = item + '</script>';
                text = item ? text.replace(str, pre + this.beautyJs(str)) : text;
            });
        }
        if (cssText && formatNeed.includes('css')) {
            let cssArr = cssText[0].split(/<\/style>\n*/);
            cssArr.forEach((item, index) => {
                let pre = '';
                if (index === 0) {
                    pre = '\n';
                }
                let str = item + '</style>';
                text = item ? text.replace(str, pre + this.beautyCss(str)) : text;
            });
        }
        this.newText = text.replace(/(\n|\t|\r)\s*(\n|\t|\r){2,}/g, '$1$1').trim() + '\n';
    },
    mergeFormatTag(arrUnFormat = [], arrForceFormat = []) {
        arrForceFormat.forEach(item => {
            let index = arrUnFormat.indexOf(item);
            if (index > -1) {
                arrUnFormat.splice(index, 1);
            }
        });
        return arrUnFormat;
    },
    beautyHtml(text) {
        let str = '';
        let indentRoot = this.vueFormatConf['html_indent_root'] || false;
        let functional = /<template[^>]*\s+functional/.test(text) ? ' functional' : '';
        let lang = this.getLang(text);
        let tempConf = {
            unformatted: this.mergeFormatTag(htmlUnFormat, this.jsBeautifyConf.html.force_format)
        };

        text = indentRoot ? text : text.replace(/<template[^>]*>([\w\W]+)<\/template>/, '$1');
        if (/pug/.test(lang)) {
            str = pugBeautify(text, this.pugBeautifyConf)
                .trim();
        } else {
            tempConf = Object.assign(tempConf, this.jsBeautifyConf, this.jsBeautifyConf.html);
            delete tempConf.wrap_attributes;
            str = beautify.html(text, tempConf);
        }
        if (+this.vueFormatConf.break_attr_limit > -1) {
            str = breakTagAttr(str, +this.vueFormatConf.break_attr_limit, {
                indentSize: +this.jsBeautifyConf.indent_size,
                attrEndWithGt: this.vueFormatConf.attr_end_with_gt,
                tempConf: tempConf
            });
        }
        return indentRoot ? `${str}\n` : `<template${lang}${functional}>\n${str}\n</template>\n`;
    },
    beautyCss(text) {
        let scoped = /<style[^>]*\s+scoped/.test(text) ? ' scoped' : '';
        let lang = this.getLang(text);
        let str = text;
        text = text.replace(/<style[^>]*>([\w\W]*)<\/style>/, '$1');
        if (text.trim()) {
            let tempConf = Object.assign({}, this.jsBeautifyConf, this.jsBeautifyConf.css);
            str = beautify.css(text, tempConf);
            return `<style${lang}${scoped}>\n${str}\n</style>`;
        } else {
            return str;
        }
    },
    beautyJs(text) {
        let scoped = /<script[^>]*\s+scoped/.test(text) ? ' scoped' : '';
        let lang = this.getLang(text);
        let str = text;
        text = text.replace(/<script[^>]*>([\w\W]*)<\/script>/, '$1');
        if (text.trim()) {
            let tempConf = Object.assign({}, this.jsBeautifyConf, this.jsBeautifyConf.js);
            str = beautify.js(text, tempConf);
            return `<script${lang}${scoped}>\n${str}\n</script>`;
        } else {
            return str;
        }
    },
    getLang(text) {
        let lang = text.match(/lang=(["'])([a-zA-Z\-\_]*)\1/, '$2');
        return lang && ` lang="${lang.pop()}"` || '';
    },
    writeFile() {
        let start = new Position(0, 0);
        let end = new Position(this.lineCount + 1, 0);
        let range = new Range(start, end);
        editor.edit((editBuilder, error) => {
            error && window.showErrorMessage(error);
            editBuilder.replace(range, this.newText);
        });
    },
    getConfig() {

        this.editorConf = Object.assign({}, workspace.getConfiguration('editor'));
        this.initDefaultJsBConf(this.jsBeautifyConf);
        let vueFormatConf = workspace.getConfiguration('vue-format');
        this.vueFormatConf = vueFormatConf;
        if (!vueFormatConf) {
            return;
        }
        let jsBConf = vueFormatConf.get('js-beautify') || {};
        this.mergeBeautifyConf(jsBConf, 'jsBeautifyConf');
        let pugBConf = vueFormatConf.get('pug-beautify') || {};
        this.mergeBeautifyConf(pugBConf, 'pugBeautifyConf');
    },
    initDefaultJsBConf(conf) {
        this.jsBeautifyConf.indent_size = this.editorConf.tabSize;
        if (this.editorConf.insertSpaces) {
            this.jsBeautifyConf.indent_char = ' ';
        } else {
            this.indent_with_tabs = true;
        }
    },
    mergeBeautifyConf(conf, type) {
        for (let k in conf) {
            // if (!this[type][k]) {
            //     continue;
            // }
            let cont = conf[k];
            if (typeof cont === 'string') {
                let teMatch = cont.match(/editor\.(\w+)/g);
                if (teMatch) {
                    let editKey = teMatch[0].replace('editor.', '');
                    cont = this.editorConf[editKey];
                }
            }
            if (cont instanceof Object) {
                Object.assign(this[type][k], cont);
            } else {
                this[type][k] = cont;
            }
        }
        return this[type];
    }
};

module.exports = methods;
