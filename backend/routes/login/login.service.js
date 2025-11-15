const bcrypt = require('bcrypt');

module.exports = {
	async loginService(userDto) {
		const {password, ...payload} = await this.authRepository.getPassword(userDto.email);
		const isPasswordCorrect = await bcrypt.compare(userDto.password, password);

		if (!isPasswordCorrect) {
			throw new HttpError(401, authErrors.INCORRECT_PASSWORD);
		}

		const profile = await this.authRepository.getProfileById(payload.id);
		return {payload, profile};
	}
};
