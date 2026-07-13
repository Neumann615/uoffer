import { decode, encode } from "js-base64"

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

export function getBrandActivityTag(type: string) {
  const typeMap: any = {
    "1": "官方合作",
    "4": "快速咨询",
  }
  if (typeMap[type]) {
    return typeMap[type]
  }
  return "其他分类"
}


export function convertTo2DArray(arr: Array<any>, length: number) {
  // 创建一个空的二维数组
  const result = [];
  // 遍历一维数组
  for (let i = 0; i < arr.length; i += length) {
    // 截取指定长度的子数组
    const subArray = arr.slice(i, i + length);
    // 将子数组添加到二维数组中
    result.push(subArray);
  }
  return result;
}