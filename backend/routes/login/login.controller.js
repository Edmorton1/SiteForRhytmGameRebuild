const {zodValidateSchema} = require('../../middlewares/pipes/zod.pipe');
const {loginService} = require('./login.service');
const {LoginDTOZodSchema} = require('../../../shared/models/schemas/auth');
const {logger} = require('../../connections/logger/logger');

module.exports = {
	async loginController(req, res) {
		const userDto = zodValidateSchema(LoginDTOZodSchema, req.body);

		logger.debug({REQUEST_LOGIN: {userDto}});

		const {payload, profile} = await loginService(userDto);

		req.session.regenerate((err) => {
			if (err) {
				console.error(err);
				res.sendStatus(500);
				return;
			}

			req.session.payload = payload;

			logger.debug({RESPONSE_LOGIN: {profile}});

			res.json(profile);
		});
	}
};
