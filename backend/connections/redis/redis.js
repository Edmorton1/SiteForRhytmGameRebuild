const {RedisStore} = require('./redis.store');
const Redis = require('ioredis');
const {NotConnectedError} = require('../../errors');
const {logger} = require('../logger/logger');
const {redisConfig} = require('../configs');

/** @type {import('ioredis').Redis} */
let _client = null;
let _store = null;

module.exports = {
  get redisClient() {
    if (!_client) {
      throw new NotConnectedError('redisClient');
    }
    return _client;
  },

  get redisStore() {
    if (!_store) {
      throw new NotConnectedError('redisStore');
    }
    return _store;
  },

  connect() {
    _client = new Redis(redisConfig);

    _store = new RedisStore({
      client: _client,
      prefix: 'session-'
    });

    _client.on('error', (err) => logger.error({REDIS_ERROR: err}));
    _client.on('connect', () => logger.info('REDIS CONNECTED'));
    _client.on('ready', () => logger.info('REDIS READY'));
    _client.on('end', () => logger.info('REDIS DISCONNECTED'));
  },

  async disconnect() {
    await this.redisClient.quit();
  }
};
