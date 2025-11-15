const {countries, languages} = require('countries-list');
const z = require('zod');

const countriesList = Object.entries(countries).map(([code, info]) => ({
	code,
	name: info.name,
}));

const countryCodes = Object.keys(countries);
const zCountryCode = z.enum(countryCodes);

const languagesList = Object.entries(languages).map(([code, info]) => ({
	code,
	name: info.name,
}));

const languagesCodes = Object.keys(languages);
const zLanguageCode = z.enum(languagesCodes);

module.exports = {
	countriesList,
	zCountryCode,
	languagesList,
	zLanguageCode
};

