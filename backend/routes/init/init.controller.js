const {logger} = require('../../connections/logger/logger');
const {getProfileById} = require('../_shared/shared.repository');

module.exports = {
	async initController(req, res) {
		if (!req.session.payload) {
			logger.debug('REQUEST_INIT');
			logger.debug('RESPONSE_INIT');

			res.sendStatus(204);
			return;
		}

		const id = req.session.payload.id;

		logger.debug({REQUEST_INIT: {id}});

		const profile = await getProfileById(id);

		logger.debug({RESPONSE_INIT: {profile}});

		res.json(profile);
	}
};
