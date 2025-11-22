const pino = require('pino');
const {getEnv, NODE_ENV} = require('../../getEnv');
const {NotConnectedError} = require('../../errors');

/** @type {import('pino').Logger} */
let _logger = null;

module.exports = {
  connect() {
    _logger = pino({
      level: 'debug',
      transport:
        getEnv('NODE_ENV') === NODE_ENV.development
          ? {
              target: 'pino-pretty',
              options: {colorize: true}
            }
          : undefined
    });
    _logger.info('PINO CONNECT');
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
