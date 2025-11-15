const bcrypt = require('bcrypt');
const {HttpError} = require('../../../../../../common/http/http.error');
const {authErrors} = require('../../../../../../common/modules/auth/errors/auth');

class AuthService {
	static login = async (userDTO) => {
		const {password, ...payload} = await this.authRepository.getPassword(userDTO.email);
		const isPasswordCorrect = await bcrypt.compare(userDTO.password, password);

		if (!isPasswordCorrect) {
			throw new HttpError(401, authErrors.INCORRECT_PASSWORD);
		}

		const profile = await this.authRepository.getProfileById(payload.id);
		return {payload, profile};
	};

	static init = async (id) => {
		return await this.authRepository.getProfileById(id);
	};
}

module.exports = {AuthService};
