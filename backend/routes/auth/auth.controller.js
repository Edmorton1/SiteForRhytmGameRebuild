const {LoginDTOZodSchema} = require('../../../../../../../libs/models/schemas/auth');

const {AuthService} = require('./auth.service');
const {zodValidateSchema} = require('../../middlewares/pipes/zod.pipe');

class AuthController {
	static login = async (req, res) => {
		const userDTO = zodValidateSchema(LoginDTOZodSchema, req.body);
		const {payload, profile} = await AuthService.login(userDTO);

		req.session.regenerate((err) => {
			if (err) {
				console.error(err);
				res.sendStatus(500);
				return;
			}

			req.session.payload = payload;
			res.json(profile);
		});
	};

	static logout = (req, res) => {
		req.session.destroy((err) => {
			if (err) console.error(err);

			res.clearCookie(this.configService.getEnv('COOKIE_NAME')).sendStatus(204);
		});
	};

	static init = async (req, res) => {
		if (!req.session.payload) {
			res.sendStatus(204);
			return;
		}
		const id = req.session.payload.id;
		const profile = await AuthService.init(id);

		res.json(profile);
	};
}

module.exports = {AuthController};
