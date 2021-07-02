import { toBuffer } from 'qrcode';

/**
 * 创建二维码
 * @param data
 * @returns
 */
async function createQrcode(data: string): Promise<Buffer> {
    return new Promise((res, rej) => {
        toBuffer(data, (error, _buffer) => {
            if (error) return rej(error);
            res(_buffer);
        });
    });
}
