import { resolve } from 'path';
import { registerAs } from '@nestjs/config';
import { ENV } from '.';
import { IEnv } from '..';

export function envPath() {
  const env = process.env.NODE_ENV || 'default';
  return resolve(process.cwd(), 'env', ENV[env]);
}

export function environment(): IEnv {
  return registerAs('environment', () => ({
    user: process.env.USER_PORT,
    pkg: process.env.PKG_PORT,
    upload: process.env.UPLOAD_PORT,
    auth: process.env.AUTH_PORT,
    gateway: process.env.GATEWAY_PORT,
    socket: process.env.SOCKET_PORT,
    SecretId: process.env.SECRETID,
    SecretKey: process.env.SECRETKEY,
    Bucket: process.env.BUCKET,
    Region: process.env.REGION,
    Packagepath: process.env.PACKAGEPATH,
    env: process.env.NODE_ENV,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    email_url: process.env.ADMIN_EMAIL_URL,
    cacheURL: process.env.CACHE_URL,
    cacheProt: process.env.CACHE_PORT,
    cachePass: process.env.CACHE_PASS,
  }))();
}
