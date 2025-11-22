const {HttpError} = require('../http.error');

module.exports = {
  zodValidateSchema(schema, value) {
    const parsed = schema.safeParse(value);
    if (!parsed.success) {
      throw new HttpError(400, parsed.error);
    }
    return parsed.data;
  }
};
