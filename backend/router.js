const {Router} = require('express');
const {serverPaths} = require('../shared/common/PATHS');
const {loginController} = require('./routes/login/login.controller');
const {logoutController} = require('./routes/logout/logout.controller');
const {initController} = require('./routes/init/init.controller');
const {asyncHandle} = require('./middlewares/errors/error.middleware');
const {registrationController} = require('./routes/registration/registration.controller');
const multer = require('multer');

const router = Router();

router.post(serverPaths.login, asyncHandle(loginController));
router.delete(serverPaths.logout, asyncHandle(logoutController));
router.get(serverPaths.init, asyncHandle(initController));
router.post(serverPaths.registration, multer({}).single('avatar'), asyncHandle(registrationController));

module.exports = router;
