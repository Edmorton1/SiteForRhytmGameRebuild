const {STATUS_CODES} = require('http');
const {HttpError} = require('../../http.error');
const {logger} = require('../../connections/logger/logger');

module.exports = {
	asyncHandle: (fn) => (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch((err) => next(err));
	},

	expressError(err, req, res, next) {
		logger.error({
			path: req.originalUrl,
			method: req.method,
			body: req.body,
			query: req.query,
			params: req.params,
			message: err.message,
			stack: err.stack
		});

		if (err instanceof HttpError) {
			res.status(err.statusCode).json({
				status: err.statusCode,
				message: err.message ?? STATUS_CODES[err.statusCode]
			});
			return;
		}

		res.status(500).json({message: err.message, stack: err.stack});
	}
};
