const Plugins = require('./plugins');

let str = `
<template>
<div v-show="isShow" v-transfer-dom >
    <x-dialog class="lm-dialog sssss" v-model="show" >
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

let str1 = Plugins.init(str);

console.log(`\n`, JSON.stringify(str1, null, 2));
