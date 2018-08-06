# Change Log
All notable changes to the "vue-format" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

### 0.0.1
- init

### 0.0.6
- add config 'vue-format'
- support 'pug-template' for html lang

### 0.0.7
- change [README.md](https://github.com/win7killer/vue-format/blob/master/README.md) && [CHANGELOG.md](https://github.com/win7killer/vue-format/blob/master/CHANGELOG.md)
- change zhe image for preview

### 0.0.9
- keep the tag's sequence
- add the config of "indent_root" for html
- add the config of "force_format" for html, make sure the "template" tag can be format normally
- add the config of "html_indent_root"

### 0.0.10
- set engines version of vscode to ^1.2.0

### 0.0.11
- fix [issues#2](https://github.com/win7killer/vue-format/issues/2) 格式化自动在template script style之间加空行，即使原来已存在空行
- fix [issues#1](https://github.com/win7killer/vue-format/issues/1) 修改默认配置中 “wrap_attributes” 为 “auto”, 临时解决标签多属性换行后，格式化错乱问题 。如果需要多数行换行，在配置中修改该属性为 “force-expand-multiline”

### 0.0.13
- 支持多 `style`、`script`标签格式化

### 0.1.0
- 命令执行环境判断由 resourceLangId 改为 editorLangId，支持非 ".vue" 文件直接更改右下角语言为vue
- 自行尝试修复 [issues#1](https://github.com/win7killer/vue-format/issues/1) 中涉及到的 js-beauty 格式化强制换行问题
- 暂时停用 js-beautify.html.wrap_attributes 配置项（有上一条更改决定）
- 增加 break_attr_limit 配置项，当tag的属性数量大于这个值，则该tag所有属性强制换行；-1时强制不换行
