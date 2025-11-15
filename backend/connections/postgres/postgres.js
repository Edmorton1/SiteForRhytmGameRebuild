const {Pool} = require('pg');
const {getEnv} = require('../config/config.service');
const {NotConnectedError} = require('../../errors/errors');
const knex = require('knex');
const {logger} = require('../logger/logger.adapter');

/** @type {import('knex').Knex} */
let _pg = null;

module.exports = {
	connect() {
		const pool = new Pool({
			database: getEnv('DB_NAME'),
			host: getEnv('DB_HOST'),
			user: getEnv('DB_USER'),
			port: Number(getEnv('DB_PORT')),
			password: getEnv('DB_PASSWORD')
		});

		pool.on('connect', () => logger.info('POSTGRES CONNECT'));
		pool.on('acquire', () => logger.info('POSTGRES ACQUIRE'));
		pool.on('error', (error) => logger.error({POSTGRES_ERROR: error}));
		pool.on('release', () => logger.info('POSTGRES RELEASE'));

		_pg = knex({
			client: 'pg',
			connection: pool
		});
	},

	get pg() {
		if (!_pg) {
			throw new NotConnectedError('pg');
		}
		return _pg;
	},

	async disconnect() {
		await this.pg.destroy();
		this.logger.logger.info('POSTGRES DISCONNECT');
	}
};
