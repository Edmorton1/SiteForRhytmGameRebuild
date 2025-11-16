const bcrypt = require('bcrypt');
const {pg} = require('../../connections/postgres/postgres');
const {randomUUID} = require('crypto');

/** @param {import('./registration.controller').RegistrationDto} authDto */
async function registration(authDto, insertUser) {
	const avatar = authDto.avatar ? await uploadAvatar(authDto.avatar) : null;

	return pg.transaction(async (trx) => {
		console.log(authDto);
		const Payload = await insertUser(trx, authDto.user);
		console.log('ПАЙЛОАД');

		const profile = await trx('profiles')
			.insert({...authDto.profile, id: Payload.id, avatar})
			.returning('*')
			.first();

		return profile;
	});
}

async function uploadAvatar(avatar) {
	// TODO: Mocking upload avatar
	return randomUUID();
}

/** @param {import('knex').Knex.Transaction} trx */
async function insertUser(trx, value) {
	const userRoleId = await trx('users').insert(value).returning(['id', 'role']).first();
	return userRoleId;
}

/** @param {import('knex').Knex.Transaction} trx */
async function createUser(trx, userDto) {
	// TODO: set many salt
	const hashPassword = await bcrypt.hash(userDto.password, 3);
	return await insertUser(trx, {
		...userDto,
		password: hashPassword
	});
}

module.exports = {
	async registrationEmail(authDTO) {
		return registration(authDTO, (trx) => createUser(trx, authDTO.user));
	},

	async registrationProvider(profileDTO, provider) {
		return registration(profileDTO, (trx) => insertUser(trx, {provider_id: provider.id, email: provider.email}));
	},

	async isInDB(table, column, value) {
		// const result = pg(table).where(column, value).first().select(pg.raw('EXISTS(SELECT 1) as exists'));
		const {
			rows: [{exists}]
		} = await pg.raw(`SELECT EXISTS(SELECT 1 FROM ?? WHERE ?? = ?) AS "exists"`, [table, column, value]);

		return exists;
	}
};
