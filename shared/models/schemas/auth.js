const z = require('zod');
const {zEmailPassword} = require('./user');

module.exports = {
	LoginDtoZodSchema: z.object(zEmailPassword)
};
