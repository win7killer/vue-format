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
- suport multiple `style`、`script` tags

### 0.1.0
- 命令执行环境判断由 resourceLangId 改为 editorLangId，支持非 ".vue" 文件直接更改右下角语言为vue
- 自行尝试修复 [issues#1](https://github.com/win7killer/vue-format/issues/1) 中涉及到的 js-beauty 格式化强制换行问题
- 暂时停用 js-beautify.html.wrap_attributes 配置项（有上一条更改决定）
- 增加 break_attr_limit 配置项，当tag的属性数量大于这个值，则该tag所有属性强制换行；-1时强制不换行

### 0.1.1
- hotfix 😭, fix miss user config~~

### 0.1.2
- fix [issues#5](https://github.com/win7killer/vue-format/issues/5) fix import css、resource unknown error
- update js-beautify to1.8.4

### 0.1.3
- update js-beautify to1.8.8
- [issues#6](https://github.com/win7killer/vue-format/issues/5) fix miss the "functional"
- Add README_EN.md (渣渣英语，无力)

### 0.1.4
- [issues#9](https://github.com/win7killer/vue-format/issues/9)增加配置项 “format_need”，分开自由控制是否格式化html、css、js。默认值["html", "css", "js"]，数组项表示需要格式化的list
- [issues#10](https://github.com/win7killer/vue-format/issues/10)增加配置项 “attr_end_with_gt”，控制标签 attrs 换行后，标签后括号是否跟随最后一个attr保持一行。默认为true。【需要break_attr_limit生效后该属性才有用】

### 0.1.5
- [issues#12](https://github.com/win7killer/vue-format/issues/12) 取消对 js-beautify 中 html.unformatted 标签的 属性断行【例如，span 标签，不在对其attrs 做断行处理，inline标签不作任何处理。如需格式化对应标签，可在 `vue-format.js-beautify.html.force_format` 中添加对应标签名，如“template”】
- 优化 template 和 script && style 标签之间的换行存在空格时导致格式化变多行问题。

### 0.1.6
- 修复 package-lock.json 中引用 event-stream 引起的安全警报。
