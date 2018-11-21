# vue-format README

- English: [./README_EN.md](./README_EN.md)
- 中文: [./README.md](./README.md)

Format single file with '.vue'
> If you have some issue, just let me know https://github.com/win7killer/vue-format

> Your issue is my force for this project.  `Welcome to STAR && FORK`


## Big Notice
> version 0.1.0 try to fix the indent error, because "js-beautify.html.wrap_attributes: "force-expand-multiline". If there are some error, issue at anytime please.

## Features
<img src="https://raw.githubusercontent.com/win7killer/vue-format/master/images/command.gif" alt="command" width=600/>

## Requirements
- js-beautify: [https://github.com/beautify-web/js-beautify](https://github.com/beautify-web/js-beautify)
- pug-beautify: [https://github.com/vingorius/pug-beautify](https://github.com/vingorius/pug-beautify)


## Extension Settings

- Use [js-beautify](https://github.com/beautify-web/js-beautify)'s config 和 [pug-beautify](https://github.com/vingorius/pug-beautify)'s config
- indent_size: default use the "editor.tabSize"

```json
{
    "html_indent_root": false, // If need to indent the root tag of template in ".vue" file
    "break_attr_limit": -1, // when attributes.length > the value，break attributes force; keep inline when -1.
    "attr_end_with_gt": true, // when "break_attr_limit" works, if don't use "\n" before tag's ">"，default "true"
    "format_need": ["html", "js", "css"], // the list of need to format, default ["html", "js", "css"]. delete anyone if you don't need format.
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
