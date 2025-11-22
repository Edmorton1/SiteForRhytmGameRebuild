const z = require('zod');
const {zId, zISOString} = require('../enums/zod');
const {zCountryCode} = require('../enums/countries');

const ProfileZodSchema = z.object({
	id: zId,
	name: z.string().max(32).nonempty(),
	// У Client и Server будут свои Dto's
	avatar: z.string().nullable(),
	about: z.string().max(512),
	country_code: zCountryCode,
	created_at: zISOString
});

module.exports = {
	ProfileZodSchema,

	ProfileDtoZodSchema: ProfileZodSchema.pick({
		name: true,
		about: true,
		about: true,
		country_code: true
	}),

	UserProfileZodSchemaClient: ProfileZodSchema.pick({
		id: true,
		name: true,
		avatar: true,
		country_code: true
	})
};
