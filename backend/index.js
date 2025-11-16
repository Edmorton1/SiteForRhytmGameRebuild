const {getEnv} = require('./getEnv');
const express = require('express');
const cors = require('cors');
const {constants} = require('../shared/common/CONST');

(async () => {
	const logger = require('./connections/logger/logger');
	logger.connect();
	const pg = require('./connections/postgres/postgres');
	pg.connect();
	const redis = require('./connections/redis/redis');
	redis.connect();

	const PORT = getEnv('PORT');
	const app = express();

	app.use(cors());
	app.use(express.json());

	const {expressSession} = require('./middlewares/errors/session.middleware');
	app.use(expressSession);

	const router = require('./router');
	app.use(constants.SERVER_PREFIX, router);

	const {expressError} = require('./middlewares/errors/error.middleware');
	app.use(expressError);

	app.listen(PORT, () => {
		// TODO: Хардкод убрать
		console.log(`Server is running on http://localhost:${PORT}`);
	});
})();
