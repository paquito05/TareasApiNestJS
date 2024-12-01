import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRIVATE_KEY: string;
  TOKEN_EXPIRES: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    PRIVATE_KEY: joi.string().required(),
    TOKEN_EXPIRES: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  private_key: envVars.PRIVATE_KEY,
  token_expires: envVars.TOKEN_EXPIRES,
};
