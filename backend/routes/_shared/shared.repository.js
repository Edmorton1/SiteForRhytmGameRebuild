const {pg} = require('../../connections/postgres/postgres');

module.exports = {
	async getProfileById(id) {
		console.log('GET PROFILE BY ID | ЕСЛИ УДАЛИТЬ ПОЛЬЗОВАТЕЛЯ ИЗ БД И НЕ ОБНОВИТЬ СЕССИЮ, БУДЕТ ОШИБКА');
		return await pg
			.select(['id', 'name', 'avatar', 'country_code'])
			.from('profiles')
			.where('id', '=', id)
	}
};
