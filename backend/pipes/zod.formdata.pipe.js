const {ZodError} = require('zod');
const {HttpError} = require('../http.error');

module.exports = {
  /**
   * @param {import ('express').Request} req
   * @param {import ('zod').ZodType} schema
   * */
  zodValidateFormData(req, fileName, schema) {
    const {body, file} = req;

    if (typeof body !== 'object' || body === null || !('json' in body)) {
      throw new HttpError(400, 'The passed FormData has no property json');
    }

    try {
      const json = JSON.parse(body.json);
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
