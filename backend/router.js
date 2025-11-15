const {Router} = require('express');
const {serverPaths} = require('../shared/common/PATHS');
const {AuthController} = require('./routes/auth/auth.service');

const router = Router();

// router.get(serverPaths.registration);
router.post(serverPaths.login, AuthController.login);
router.delete(serverPaths.logout, AuthController.logout);
router.get(serverPaths.init, AuthController.init);

module.exports = router;
