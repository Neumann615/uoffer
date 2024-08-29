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
    // postprocess: [
    //     (util) => {
    //         const pxRE = /(-?[.\d]+)px/g;
    //         util.entries.forEach((entry) => {
    //             const value = entry[1];
    //             if (typeof value === 'string' && pxRE.test(value)) {
    //                 entry[1] = value.replace(pxRE, (_, pixelValue) =>` ${pixelValue / 100}vw`);
    //             }
    //         })
    //     }
    // ]
})