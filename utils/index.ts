import { decode, encode } from "js-base64"

export function encryptionData(v: object): string {
  return encode(JSON.stringify(v))
}

export function decryptData(v: string): any {
  return JSON.parse(decode(v))
}
