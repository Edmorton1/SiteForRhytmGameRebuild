const {Router} = require('express');
const {serverPaths} = require('../shared/common/PATHS');
const {loginController, logoutController, initController, registrationController} = require('./routes');
const {asyncHandle} = require('./middlewares/error.middleware');
const multer = require('multer');

const router = Router();

router.post(serverPaths.login, asyncHandle(loginController));
router.delete(serverPaths.logout, asyncHandle(logoutController));
router.get(serverPaths.init, asyncHandle(initController));
router.post(serverPaths.registration, multer({}).single('avatar'), asyncHandle(registrationController));

module.exports = router;
