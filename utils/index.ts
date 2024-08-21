import {decode, encode} from "js-base64"

export function encryptionData(v: object): string {
    return encode(JSON.stringify(v))
}

export function decryptData(v: string): any {
    return JSON.parse(decode(v))
}

export function convertArraysToStringsInObject(
    obj: Record<string, any>
): Record<string, any> {
    // 创建一个新的对象来存储修改后的值
    const result: Record<string, any> = {}

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key]

            // 检查是否为数组，并转换为字符串
            if (Array.isArray(value)) {
                result[key] = encryptionData(value)
            } else if (typeof value === "object" && value !== null) {
                // 如果是对象，递归处理
                result[key] = convertArraysToStringsInObject(value)
            } else {
                // 对于非数组、非对象的值，直接赋值
                result[key] = value
            }
        }
    }

    return result
}

