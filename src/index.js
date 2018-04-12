/**
 * @file 格式化 单vue组件 文件
 * @author fe_bean
 */

const {window, Position, Range, workspace} = require('vscode');
const beautify = require('js-beautify');

// let terminal = window.createTerminal({name: "xmake"});
// terminal.show(true);
// terminal.sendText("xmake");

let editor;

let methods = {
    doc: null,
    text: '',
    newText: '',
    lineCount: 1,
    init() {
        editor = window.activeTextEditor;
        if (!editor) throw new Error('no active editor');
        this.doc = editor.document;
        // let conf = workspace.getConfiguration('vue-format');
        // let ss = typeof conf.config + '';
        // console();
        this.lineCount = this.doc.lineCount;
        this.text = this.doc.getText();
        this.newText = '';
        this.splitContent(this.text);
        this.writeFile();
    },
    splitContent(text) {
        let htmlText = text.match(/[\w\W]+<\/template>\s?/)[0];
        let jsText = text.match(/<script[\w\W]+<\/script>\s?/)[0];
        let cssText = text.match(/<style[\w\W]+<\/style>\s?/)[0];
        this.newText += this.beautyHtml(htmlText);
        this.newText += this.beautyJs(jsText);
        this.newText += this.beautyCss(cssText);
        this.newText = this.newText.replace(/(\n)+$/, '\n');
    },
    beautyHtml(text) {
        if (!text) {
            throw new Error(text);
        }
        let lang = this.getLang(text);
        text = text.replace(/<template[^>]*>([\w\W]+)<\/template>/, '$1');
        let str = beautify.html(text, {
            indent_size: 4
        });
        return `<template${lang}>\n${str}\n</template>\n\n`;
    },
    beautyCss(text) {
        if (!text) {
            throw new Error(text);
        }
        let scoped = /<style[^>]*\s+scoped/.test(text) ? ' scoped' : '';
        let lang = this.getLang(text);
        text = text.replace(/<style[^>]*>([\w\W]+)<\/style>/, '$1');
        let str = beautify.css(text, {
            indent_size: 4
        });
        return `<style${lang}${scoped}>\n${str}\n</style>\n\n`;
    },
    beautyJs(text) {
        if (!text) {
            throw new Error(text);
        }
        let lang = this.getLang(text);
        text = text.replace(/<script[^>]*>([\w\W]+)<\/script>/, '$1');
        let str = beautify.js(text, {
            indent_size: 4,
            space_after_anon_function: true,
            keep_array_indentation: true
        });

        return `<script${lang}>\n${str}\n</script>\n\n`;
    },
    getLang(text) {
        let lang = text.match(/lang=(["'])([a-zA-Z\-\_]*)\1/, '$2');
        return lang && ` lang="${lang.pop()}"` || '';
    },
    writeFile() {
        let start = new Position(0, 0);
        let end = new Position(this.lineCount, 0);
        let range = new Range(start, end);
        editor.edit((editBuilder, error) => {
            error && window.showErrorMessage(error);
            editBuilder.replace(range, this.newText);
        });
    },
    config() {
        const configuration = workspace.getConfiguration('vue-format');
        return {

        };
    }
};

module.exports = methods;
