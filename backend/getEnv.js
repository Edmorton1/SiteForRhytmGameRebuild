const dotenv = require('dotenv');
dotenv.config();

/**
 * @typedef {'PORT' |
 * 'HOST' |
 * 'URL_SERVER' |
 * 'URL_CLIENT' |
 * 'AUTH_PORT' |
 * 'AUTH_HOST' |
 * 'DB_NAME' |
 * 'DB_HOST' |
 * 'DB_USER' |
 * 'DB_PORT' |
 * 'DB_PASSWORD' |
 * 'REDIS_HOST' |
 * 'REDIS_PORT' |
 * 'SESSION_SECRET' |
 * 'COOKIE_NAME' |
 * 'NODE_ENV' |
 * 'GOOGLE_CLIENT_ID' |
 * 'GOOGLE_CLIENT_SECRET' |
 * 'KAFKA_BROKERS' |
 * 'KAFKA_CLIENT_ID'} EnvKey
 */

const validateEnv = (value, param) => {
  isString(value, param);
  if (param === 'NODE_ENV') {
    isMode(value);
  }
};

const isString = (value, param) => {
  if (typeof value !== 'string') {
    throw new Error(`Specify a required parameter ${param}`);
  }
};

const NODE_ENV = {
  production: 'production',
  development: 'development'
};

const isMode = (value) => {
  if (value !== NODE_ENV.production && value !== NODE_ENV.development) {
    throw new Error(`NODE_ENV should be ${NODE_ENV.production} or ${NODE_ENV.development}. Now this - ${value}`);
  }
};

module.exports = {
  /**
   * @param {EnvKey} param
   * @returns {string}
   */
  getEnv(param) {
    const value = process.env[param];
    validateEnv(value, param);
    return value;
  },
  NODE_ENV
};
