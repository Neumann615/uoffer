// uno.config.ts
import {defineConfig, presetAttributify, presetIcons, presetTypography, presetUno} from 'unocss'
import presetRemToPx from "@unocss/preset-rem-to-px";

export default defineConfig({
    presets: [
        presetAttributify(), // 如果使用属性模式，则必需
        presetUno(), // 必需
        presetTypography(),
        presetIcons(),
        //presetRemToPx()
    ],
})