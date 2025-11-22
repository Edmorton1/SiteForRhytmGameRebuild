const {pgConfig} = require('../configs');
const knex = require('knex');
const {logger} = require('../logger/logger');
const {NotConnectedError} = require('../../errors');

/** @type {import('knex').Knex} */
let _pg = null;

module.exports = {
  connect() {
    _pg = knex(pgConfig);

    const client = _pg.client.pool;

    client.on('createSuccess', () => logger.info('POSTGRES CONNECT'));
    client.on('createFail', (err) => logger.error({POSTGRES_CONNECT_ERROR: err}));
    client.on('destroySuccess', () => logger.info('POSTGRES DISCONNECT'));
    client.on('destroyFail', (err) => logger.error({POSTGRES_DISCONNECT_ERROR: err}));
    client.on('error', (err) => logger.error({POSTGRES_ERROR: err}));
  },

  get pg() {
    if (!_pg) {
      throw new NotConnectedError('pg');
    }
    return _pg;
  },

  async disconnect() {
    await this.pg.destroy();
  }
};
