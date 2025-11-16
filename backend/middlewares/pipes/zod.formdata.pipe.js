const {ZodError} = require('zod');
const {HttpError} = require('../../http.error');

module.exports = {
	zodValidateFormData({data, name, schema, files: file}) {
		if (typeof data !== 'object' || data === null || !(name in data)) {
			throw new HttpError(400, `The passed FormData has no property ${name}`);
		}

		try {
			const json = JSON.parse(data[name]);
			const parsed = schema.parse({...json, ...file});
			return parsed;
		} catch (err) {
			if (err instanceof ZodError) {
				throw new HttpError(400, JSON.parse(err.message));
			}
			throw new HttpError(400, `The passed FormData with the property ${name} is not JSON`);
		}
	}
};
