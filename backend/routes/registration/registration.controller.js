const {zodValidateFormData} = require('../../middlewares/pipes/zod.formdata.pipe');
const {UserDTOZodSchema} = require('../../../shared/models/schemas/user');
const {ProfileDTOZodSchema} = require('../../../shared/models/schemas/profile');
const {registrationService} = require('./registration.service');
const {zExpressMulterFile} = require('../../../shared/models/enums/zod');
const z = require('zod');
const {logger} = require('../../connections/logger/logger');

/** @typedef {import('zod').infer<typeof RegistrationDtoSchema>} RegistrationDto */
const RegistrationDtoSchema = z.object({
	user: UserDTOZodSchema,
	profile: ProfileDTOZodSchema,
	avatar: zExpressMulterFile.optional()
});

module.exports = {
	/**
	 * @param {import('express').Request} req
	 * @param {import ('express').Response} res
	 * */
	async registrationController(req, res) {
		/** @type {RegistrationDto} */
		const authDto = zodValidateFormData(req, 'avatar', RegistrationDtoSchema);

		logger.debug({REQUEST_REGISTRATION: {...authDto, avatar: {...authDto.avatar, buffer: undefined}}});

		const provider = req.session.provider;
		delete req.session.provider;

		const profile = await registrationService(authDto, provider);

		logger.debug({RESPONSE_REGISTRATION: profile});

		req.session.regenerate((err) => {
			if (err) {
				console.error(err);
				res.sendStatus(500);
				return;
			}
			req.session.payload = {id: profile.id, role: 'user'};
			res.status(201).json(profile);
		});
	}
};
