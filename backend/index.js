const {getEnv} = require('./adapters/config/config.service');
const express = require('express');
const cors = require('cors');
const router = require('./router');

const PORT = getEnv('PORT');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', router);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
