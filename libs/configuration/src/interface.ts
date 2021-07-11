export type Environment = {
  NODE_ENV: string;
  USER_PORT?: string;
  PKG_PORT?: string;
  AUTH_PORT?: string;
  GRPHQL_PORT?: string;
  UPLOAD_PORT?: string;
  SOCKET_PORT?: string;
  SECRETID?: string;
  SECRETKEY?: string;
  BUCKET?: string;
  REGION?: string;
  PACKAGEPATH?: string;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
  ADMIN_EMAIL_URL: string;
  CACHE_PORT?: string;
  CACHE_URL?: string;
  CACHE_PASS?: string;
};

export interface IEnv {
  user: string;
  pkg: string;
  auth: string;
  grphql: string;
  SecretId: string;
  SecretKey: string;
  Bucket: string;
  Region: string;
  Packagepath: string;
  env: string;
  email: string;
  password: string;
  email_url: string;
  cacheURL: string;
  cacheProt: string;
  cachePass: string;
  socket: string;
}
