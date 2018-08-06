const { breakTagAttr } = require('./plugins');

let str = `
<template>
<div v-show="isShow" v-transfer-dom>
    <x-dialog class="lm-dialog sssss" v-model="show">
        <div class="dialog-content-wrapper">
            <div class="dialog-title"></div>
            <slot name="dialog-content">
                <div class="dialog-content">
                    <slot></slot>
                </div>
            </slot>
        </div>
        <a href="javascript:;" class="close-btn" >
            <icon type="cancel"></icon>
        </a>
    </x-dialog>
</div>
</template>
`;

let str1 = `
<template>
<div v-if="{
        ss: 1 > 0
    }" :style="{

    }" :class="{
        show: 1 > 2
    }" :ccccc='[
        "haha"
    ]' data-text=">>>>>>>>>>>" @click="clickFn" class="article" data-id=123 ff="><<><><><">
    <ArticleList :data="123" name="cccss" class="go"></ArticleList>
    <p id="sdsd" name="cc"><span></span></p>
    <div class="class">shit</div>
    <div class="test" :data-cc="getCC">{{getCC.replace(/\s/, '')}}</div>
    <div class="test" :data-cc="getCC">{{getCC > 123 ? 'sss' : 'dddd'}}</div>

    <div class="left clearfix" id="haha">
        <ul class="clearfix">
            <li v-for="(item, index) of list" :key="index" :data="item" class="item">{{test}}</li>
        </ul>
    </div>
    <x-man class="sdsd" id="123"></x-man>
</div>
</template>
`;

let str2 = `
<x-man class="sdsd" id="123"></x-man>
`;

let res = breakTagAttr(str1, 1);

console.log(res);
