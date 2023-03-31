import * as Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().default('dbuser'),
  DB_PASS: Joi.string().default('dbpass'),
  DB_DATABASE: Joi.string().default('nestdb'),
  SERVER_PORT: Joi.number().default(3000),
});
