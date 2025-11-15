const pino = require('pino');
const {getEnv, NODE_ENV} = require('../config/config.service');
const {NotConnectedError} = require('../../errors/errors');

/** @type {import('pino').Logger} */
let _logger = null;

module.exports = {
	connect() {
		_logger = pino({
			level: 'info',
			transport:
				getEnv('NODE_ENV') === NODE_ENV.development
					? {
							target: 'pino-pretty',
							options: {colorize: true}
						}
					: undefined
		});
	},

	get logger() {
		if (!_logger) {
			throw new NotConnectedError('pino(logger)');
		}
		return _logger;
	},

	disconnect() {
		this.logger.flush();
	}
};
