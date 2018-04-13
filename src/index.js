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
let defaultConf = require('../js-beautify.conf.json');
let editor;

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
        let htmlText = text.match(/[\w\W]+<\/template>\s?/);
        let jsText = text.match(/<script[\w\W]+<\/script>\s?/);
        let cssText = text.match(/<style[\w\W]+<\/style>\s?/);

        this.newText += htmlText ? this.beautyHtml(htmlText[0]) : '';
        this.newText += jsText ? this.beautyJs(jsText[0]) : '';
        this.newText += cssText ? this.beautyCss(cssText[0]) : '';
        this.newText = this.newText.replace(/(\n)+$/, '\n');
    },
    beautyHtml(text) {
        let lang = this.getLang(text);
        text = text.replace(/<template[^>]*>([\w\W]+)<\/template>/, '$1');
        let tempConf = {};
        let str = text;
        if (/pug/.test(lang)) {
            str = pugBeautify(text, this.pugBeautifyConf)
                .trim()
                ;
        } else {
            tempConf = Object.assign({}, this.jsBeautifyConf, this.jsBeautifyConf.html);
            str = beautify.html(text, tempConf);
        }
        return `<template${lang}>\n${str}\n</template>\n\n`;
    },
    beautyCss(text) {
        let scoped = /<style[^>]*\s+scoped/.test(text) ? ' scoped' : '';
        let lang = this.getLang(text);
        text = text.replace(/<style[^>]*>([\w\W]+)<\/style>/, '$1');
        let tempConf = Object.assign({}, this.jsBeautifyConf, this.jsBeautifyConf.css);
        let str = beautify.css(text, tempConf);
        return `<style${lang}${scoped}>\n${str}\n</style>\n\n`;
    },
    beautyJs(text) {
        let lang = this.getLang(text);
        text = text.replace(/<script[^>]*>([\w\W]+)<\/script>/, '$1');
        let tempConf = Object.assign({}, this.jsBeautifyConf, this.jsBeautifyConf.js);
        let str = beautify.js(text, tempConf);
        return `<script${lang}>\n${str}\n</script>\n\n`;
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
