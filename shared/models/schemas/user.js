const z = require('zod');
const {zId} = require('../enums/zod');

const rolesZodSchema = z.enum(['user', 'admin']);

const zEmailPassword = {
	email: z.email().max(256),
	// TODO: set min length more
	password: z.string().min(3).max(128)
};

const UserZodSchema = z.object({
	id: zId,
	role: rolesZodSchema,
	email: zEmailPassword.email.nullable(),
	provider_id: z.string().max(21).nullable(),
	password: zEmailPassword.password.nullable(),
	banned: z.boolean().default(false)
});

const UserDTOZodSchema = UserZodSchema.pick({
	email: true,
	password: true
});

module.exports = {
	rolesZodSchema,
	zEmailPassword,
	UserZodSchema,
	UserDTOZodSchema
};
