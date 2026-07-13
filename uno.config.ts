// uno.config.ts
import {defineConfig, presetAttributify, presetIcons, presetTypography, presetUno} from 'unocss'
import presetRemToPx from "@unocss/preset-rem-to-px";

export default defineConfig({
    presets: [
        presetRemToPx({
            baseFontSize: 4
        }),
        presetAttributify(), // 如果使用属性模式，则必需
        presetUno(), // 必需
        presetTypography(),
        presetIcons()
    ],
    theme: {
        breakpoints: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        }
    },
})