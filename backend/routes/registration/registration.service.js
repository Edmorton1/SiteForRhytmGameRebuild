const {HttpError} = require('../../http.error');
const {registrationEmail, registrationProvider, isInDB} = require('./registration.repository');

function getAuthType(provider, user) {
	if (provider && user.email === null && user.password === null) return 'provider';
	if (!provider && user.email && user.password) return 'email';
	return 'none';
}

/** @param {import('./registration.controller').RegistrationDto} authDto */
async function registrationWithEmail(authDTO) {
	await isEmailIsFree(authDTO.user.email);
	await isNameIsFree(authDTO.profile.name);

	return await registrationEmail(authDTO);
}

async function registrationWithProvider(authDto, provider) {
	await isNameIsFree(authDto.profile.name);

	return await registrationProvider(authDto, provider);
}

async function isEmailIsFree(email) {
	if (await isInDB('users', 'email', email)) {
		throw new HttpError(409, 'An account with this email already exists');
	}
}

async function isNameIsFree(name) {
	if (await isInDB('profiles', 'name', name)) {
		throw new HttpError(409, 'This nickname is already taken');
	}
}

module.exports = {
	/** @param {import('./registration.controller').RegistrationDto} authDto */
	async registrationService(authDto, provider) {
		const {user, ...profileDto} = authDto;
		const authType = getAuthType(provider, user);
		switch (authType) {
			case 'email':
				return await registrationWithEmail(authDto);
			case 'provider':
				return await registrationWithProvider(profileDto, provider);
			case 'none':
				throw new HttpError(
					400,
					"There can't be a token, email and password at the same time, choose one authorization method"
				);
		}
	}
};
