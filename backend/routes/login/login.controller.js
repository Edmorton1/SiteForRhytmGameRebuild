const {zodValidateSchema} = require('../../middlewares/pipes/zod.pipe');
const loginService = require('./login.service');

module.exports = {
	async loginConnect(req, res) {
		const userDTO = zodValidateSchema(LoginDTOZodSchema, req.body);
		const {payload, profile} = await loginService(userDTO);

		req.session.regenerate((err) => {
			if (err) {
				console.error(err);
				res.sendStatus(500);
				return;
			}

			req.session.payload = payload;
			res.json(profile);
		});
	}
};
