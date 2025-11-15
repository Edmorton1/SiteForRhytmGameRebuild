const {HttpError} = require('../../../../../../common/http/http.error');
const {authErrors} = require('../../../../../../common/modules/auth/errors/auth');

class AuthRepository {
	static getPassword = async (email) => {
		const user = await this.db.db
			.selectFrom('users')
			.select(['id', 'role', 'password'])
			.where('email', '=', email)
			.executeTakeFirst();

		if (!user?.password) {
			throw new HttpError(404, authErrors.NO_EMAIL);
		}

		return {...user, password: user.password};
	};

	static getProfileById = async (id) => {
		console.log('GET PROFILE BY ID | ЕСЛИ УДАЛИТЬ ПОЛЬЗОВАТЕЛЯ ИЗ БД И НЕ ОБНОВИТЬ СЕССИЮ, БУДЕТ ОШИБКА');
		return await this.db.db
			.selectFrom('profiles')
			.select(['id', 'name', 'avatar', 'country_code'])
			.where('id', '=', id)
			.executeTakeFirstOrThrow();
	};
}

module.exports = {AuthRepository};
