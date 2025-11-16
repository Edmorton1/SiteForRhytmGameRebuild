const {ZodError} = require('zod');
const {HttpError} = require('../../http.error');

module.exports = {
	/**
	 * @param {import ('express').Request} req
	 * @param {string} name
	 * @param {import ('zod').ZodType} schema
	 * */
	zodValidateFormData(req, fileName, schema) {
		const {body, file} = req;

		if (typeof body !== 'object' || body === null || !('json' in body)) {
			throw new HttpError(400, 'The passed FormData has no property json');
		}

		try {
			const json = JSON.parse(body.json);
			console.log({...json, [fileName]: file});
			const parsed = schema.parse({...json, [fileName]: file});
			return parsed;
		} catch (err) {
			if (err instanceof ZodError) {
				throw new HttpError(400, JSON.parse(err.message));
			}
			throw new HttpError(400, 'The passed FormData with the property json is not JSON');
		}
	}
};

// module.exports = {
// 	zodValidateFormData({data, name, schema, files: file}) {
// 		if (typeof data !== 'object' || data === null || !(name in data)) {
// 			throw new HttpError(400, `The passed FormData has no property ${name}`);
// 		}

// 		try {
// 			const json = JSON.parse(data[name]);
// 			const parsed = schema.parse({...json, ...file});
// 			return parsed;
// 		} catch (err) {
// 			if (err instanceof ZodError) {
// 				throw new HttpError(400, JSON.parse(err.message));
// 			}
// 			throw new HttpError(400, `The passed FormData with the property ${name} is not JSON`);
// 		}
// 	}
// };
