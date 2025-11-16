const {countries, languages} = require('countries-list');
const z = require('zod');

const countryCodes = Object.keys(countries);

const languagesCodes = Object.keys(languages);

module.exports = {
	countriesList: Object.entries(countries).map(([code, info]) => ({
		code,
		name: info.name
	})),

	zCountryCode: z.enum(countryCodes),

	languagesList: Object.entries(languages).map(([code, info]) => ({
		code,
		name: info.name
	})),

	zLanguageCode: z.enum(languagesCodes)
};
