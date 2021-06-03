import * as Joi from 'joi';
export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  USER_PORT: Joi.string().default('3002'),
  PKG_PORT: Joi.string().default('3003'),
  GATEWAY_PORT: Joi.string().default('3001'),
  UPLOAD_PORT: Joi.string().default('3004'),
  SECRETID: Joi.string().default(''),
  SECRETKEY: Joi.string().default(''),
  BUCKET: Joi.string().default(''),
  REGION: Joi.string().default(''),
  PACKAGEPATH: Joi.string().default(''),
  ADMIN_EMAIL: Joi.string().email().required(),
  ADMIN_PASSWORD: Joi.string().required(),
  ADMIN_EMAIL_URL: Joi.string().required(),
  CACHE_PORT: Joi.string().default('6379'),
  CACHE_URL: Joi.string().default('localhost'),
  CACHE_PASS: Joi.string().default('123456'),
});
