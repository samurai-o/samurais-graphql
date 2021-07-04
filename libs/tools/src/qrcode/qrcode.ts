/* eslint-disable @typescript-eslint/no-unused-vars */
import * as path from 'path';
import { toBuffer } from 'qrcode';
import * as sharp from 'sharp';

/**
 * 创建二维码
 * @param data
 * @returns
 */
async function createQrcode(data: string): Promise<Buffer> {
  return new Promise((res, rej) => {
    toBuffer(
      data,
      {
        type: 'png',
        scale: 4,
        width: 400,
        margin: 1,
        color: {
          light: '#ffffffff',
          dark: '#2773CA',
        },
      },
      (error, _buffer) => {
        if (error) return rej(error);
        res(_buffer);
      },
    );
  });
}

async function mergeImage(qrcode: Buffer) {
  const logo = await sharp(
    path.resolve(process.cwd(), 'assets/images', './logo.png'),
  )
    .resize(80, 80)
    .toBuffer();
  return await sharp(qrcode)
    .resize({
      width: 400,
      height: 400,
      fit: sharp.fit.fill,
    })
    .composite([
      {
        input: logo,
      },
    ])
    .toBuffer();
}

export async function createQr(data: string) {
  const image = await mergeImage(await createQrcode(data));
  return `data:image/png;base64,${image.toString('base64')}`;
}
