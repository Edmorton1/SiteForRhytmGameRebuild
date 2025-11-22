const {initController} = require('./init/init.controller');
const {loginController} = require('./login/login.controller');
const {logoutController} = require('./logout/logout.controller');
const {registrationController} = require('./registration/registration.controller');

module.exports = {
  initController,
  loginController,
  logoutController,
  registrationController
};
