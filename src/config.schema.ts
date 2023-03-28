import * as Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),
  AUDIENCE: Joi.string().default('world'),
  GREETING: Joi.string().default('hello'),
  SERVER_PORT: Joi.number().default(3000),
});
