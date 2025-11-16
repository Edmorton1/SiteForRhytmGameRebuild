module.exports = {
	connect() {
		const logger = require('./logger/logger');
		logger.connect();
		const pg = require('./postgres/postgres');
		pg.connect();
		const redis = require('./redis/redis');
		redis.connect();
	}
};
