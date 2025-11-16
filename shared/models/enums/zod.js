const z = require('zod');

module.exports = {
	zId: z.coerce.number().int().positive(),

	zIntNum: z.coerce.number().int(),

	zISOString: z.coerce.date().transform((d) => d.toISOString()),

	toArrayPreprocess: (schema) => z.preprocess((val) => (Array.isArray(val) ? val : [val]), z.array(schema)),

	zExpressMulterFile: z.custom((file) => {
		return (
			file &&
			typeof file === 'object' &&
			typeof file.fieldname === 'string' &&
			typeof file.originalname === 'string' &&
			typeof file.encoding === 'string' &&
			typeof file.mimetype === 'string' &&
			file.buffer instanceof Buffer &&
			typeof file.size === 'number'
		);
	}, 'Is not Express.Multer.File')
};
