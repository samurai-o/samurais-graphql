import { isArray, isNum, isObject, isString } from '@frade-sam/samtools';
import * as crypto from 'crypto-js';
import { iv, key } from './const';

class AES {
  constructor(
    private readonly key: crypto.lib.WordArray,
    private readonly iv: crypto.lib.WordArray,
  ) {
    this.encrypt = this.encrypt.bind(this);
  }

  /**
   * 加密
   * @param data
   * @returns
   */
  encrypt(
    data: string | number | Record<string, unknown>[] | Record<string, unknown>,
  ) {
    if (
      !isString(data) &&
      !isNum(data as number) &&
      !isArray(data) &&
      !isObject(data)
    )
      return '';
    let temp = data as string;
    if (isNum(data as number)) temp = String(data);
    if (isArray(data) || isObject(data)) temp = JSON.stringify(data);
    const source = crypto.enc.Utf8.parse(temp);
    const str = crypto.AES.encrypt(source, this.key, {
      iv: this.iv,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    });
    return str.ciphertext.toString().toUpperCase();
  }

  /**
   * 解密
   * @param data
   * @returns
   */
  decrypt(data: string) {
    if (!isString(data)) return null;
    const _source = crypto.enc.Hex.parse(data);
    const source = crypto.enc.Base64.stringify(_source);
    const str = crypto.AES.decrypt(source, this.key, {
      iv: this.iv,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    }).toString(crypto.enc.Utf8);
    return str.toString();
  }
}

export default new AES(key, iv);
