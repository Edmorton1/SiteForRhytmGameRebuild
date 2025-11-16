const z = require('zod');
const {zEmailPassword} = require('./user');

module.exports = {
	LoginDTOZodSchema: z.object(zEmailPassword)
};
