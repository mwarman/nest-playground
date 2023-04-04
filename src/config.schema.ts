import * as Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),
  CACHE_HOST: Joi.string().default('localhost'),
  CACHE_PORT: Joi.number().default(6379),
  CACHE_TTL: Joi.number().default(300000),
  SERVER_PORT: Joi.number().default(3000),
});
