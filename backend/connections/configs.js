const {getEnv} = require('../getEnv');

module.exports = {
  /** @type {import('knex').Knex} */
  pgConfig: {
    client: 'postgresql',
    connection: {
      database: getEnv('DB_NAME'),
      host: getEnv('DB_HOST'),
      user: getEnv('DB_USER'),
      port: Number(getEnv('DB_PORT')),
      password: getEnv('DB_PASSWORD')
    }
  },

  redisConfig: {
    host: getEnv('REDIS_HOST'),
    port: Number(getEnv('REDIS_PORT')),
    connectTimeout: 15000
  }
};
