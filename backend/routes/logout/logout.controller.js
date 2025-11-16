const {getEnv} = require('../../getEnv');
const {logger} = require('../../connections/logger/logger');

module.exports = {
	logoutController(req, res) {
		logger.debug('REQUEST_LOGOUT');

		req.session.destroy((err) => {
			if (err) console.error(err);

			logger.debug('RESPONSE_LOGOUT');

			res.clearCookie(getEnv('COOKIE_NAME')).sendStatus(204);
		});
	}
};
