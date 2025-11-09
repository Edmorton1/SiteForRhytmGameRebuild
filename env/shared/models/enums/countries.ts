import { countries, languages, TCountries, TLanguages } from 'countries-list';

export const countriesList = Object.entries(countries).map(([code, info]) => ({
	code,
	name: info.name,
}));

const countryCodes = Object.keys(countries) as (keyof TCountries)[];
export type CountryCode = (typeof languagesCodes)[number];

export const languagesList = Object.entries(languages).map(([code, info]) => ({
	code,
	name: info.name,
}));

export const languagesCodes = Object.keys(languages) as (keyof TLanguages)[];
export type LanguagesCode = (typeof languagesCodes)[number]

// export const IsIso6391 = () => {
// 	return (target: object, propertyName: string) => {
// 		IsEnum(languagesCodes)(target, propertyName)
// 	}
// }