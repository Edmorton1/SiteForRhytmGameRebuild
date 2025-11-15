const z = require('zod');
const {zEmailPassword} = require('./user');

const LoginDTOZodSchema = z.object(zEmailPassword);

module.exports = {
	LoginDTOZodSchema
};

