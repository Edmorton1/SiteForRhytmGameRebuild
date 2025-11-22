const pg = require('./postgres/postgres');
const logger = require('./logger/logger');
const redis = require('./redis/redis');
const connect = require('./connect');
const configs = require('./configs');

module.exports = {
  pg,
  logger,
  redis,
  connect,
  configs
};
