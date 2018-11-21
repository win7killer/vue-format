# vue-format README

- English: [./README_EN.md](./README_EN.md)
- 中文: [./README.md](./README.md)

Format single file with '.vue'.（格式化单组件“.vue”文件代码）
> 如果你有问题或者需求，欢迎来提 issue。  https://github.com/win7killer/vue-format

> 你的 issue 就是我的原力.  `欢迎 STAR && FORK`

## Big Notice
> 0.1.0 版本 尝试解决了 js-beauty 的标签换行导致缩进异常问题，如有问题，随时 issue

## Features
<img src="https://raw.githubusercontent.com/win7killer/vue-format/master/images/command.gif" alt="command" width=600/>

## Requirements
- js-beautify: [https://github.com/beautify-web/js-beautify](https://github.com/beautify-web/js-beautify)
- pug-beautify: [https://github.com/vingorius/pug-beautify](https://github.com/vingorius/pug-beautify)


## Extension Settings

- 使用[js-beautify](https://github.com/beautify-web/js-beautify)配置 和 [pug-beautify](https://github.com/vingorius/pug-beautify)配置
- indent_size 默认使用 editor.tabSize

```json
{
    "html_indent_root": false, // 是否缩进vue template中的根节点
    "break_attr_limit": -1, // tag 的 attrs 大于该数值时，强制 attrs 换行，-1时不换行
    "attr_end_with_gt": true, // break_attr_limit省生效时，tag的">"是否不换行，默认true
    "format_need": ["html", "js", "css"], // vue单文件中需要格式化的语言，默认["html", "js", "css"]。从数组中删除你不希望格式化的语言
    "js-beautify": {
        "indent_size": "editor.tabSize",
        "indent_char": " ",
        "indent_with_tabs": false,
        "brace-style": "collapse",
        "space_after_anon_function": true,
        "css": {},
        "js": {},
        "html": {
            "force_format": ["template"],
        }
    },
    "pug-beautify": {
        "fill_tab": false
    }
}

```

|Key|Example|Default|
|---|---|---|
|vue-format.html_indent_root|false|false|
|vue-format.break_attr_limit|2|-1|
|vue-format.attr_end_with_gt|true|true|
|vue-format.format_need|["html"]|["html", "js", "css"]
|vue-format.js-beautify|(See the config at front)|(See the config at front)
|vue-format.pug-beautify|{fill_tab: false}|{fill_tab: false}


## Changelog
U can see the changelog in [CHANGELOG.md](./CHANGELOG.md)

## Todo List
Some things todo in [todo.md](./todo.md)
