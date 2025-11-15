const z = require('zod');

const zId = z.coerce.number().int().positive();
const zIntNum = z.coerce.number().int();
const zISOString = z.coerce.date().transform(d => d.toISOString());
const toArrayPreprocess = (schema) =>
	z.preprocess(val => {
		if (Array.isArray(val)) return val;
		return [val];
	}, z.array(schema));

module.exports = {
	zId,
	zIntNum,
	zISOString,
	toArrayPreprocess
};

