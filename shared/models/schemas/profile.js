const z = require('zod');
const {zId, zISOString} = require('../enums/zod');
const {zCountryCode} = require('../enums/countries');

const ProfileZodSchema = z.object({
	id: zId,
	name: z.string().max(32).nonempty(),
	// У Client и Server будут свои DTO's
	avatar: z.string().nullable(),
	about: z.string().max(512),
	country_code: zCountryCode,
	created_at: zISOString,
});

const UserProfileZodSchemaClient = ProfileZodSchema.pick({
	id: true,
	name: true,
	avatar: true,
	country_code: true,
});

module.exports = {
	ProfileZodSchema,
	UserProfileZodSchemaClient
};

