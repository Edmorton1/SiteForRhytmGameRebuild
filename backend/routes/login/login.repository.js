const {pg} = require('../../connections/postgres/postgres');
const {HttpError} = require('../../http.error');

module.exports = {
	async getPassword(email) {
		const user = await pg
			.select(['id', 'role', 'password'])
			.from('users')
			.where('email', '=', email)
			.first()

		if (user?.password) {
			throw new HttpError(404, 'No user with such email');
		}

		return {...user, password: user.password};
	}
};
