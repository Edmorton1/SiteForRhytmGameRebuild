const {pg} = require('../../connections');

module.exports = {
  async getProfileById(id) {
    console.log('GET PROFILE BY ID | ЕСЛИ УДАЛИТЬ ПОЛЬЗОВАТЕЛЯ ИЗ БД И НЕ ОБНОВИТЬ СЕССИЮ, БУДЕТ ОШИБКА');
    const [profile] = await pg.select(['id', 'name', 'avatar', 'country_code']).from('profiles').where('id', '=', id);

    return profile;
  }
};
