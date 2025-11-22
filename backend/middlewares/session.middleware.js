const session = require('express-session');
const {getEnv} = require('../getEnv');
const {redisStore} = require('../connections').redis;

module.exports = {
  expressSession: session({
    name: getEnv('COOKIE_NAME'),
    secret: getEnv('SESSION_SECRET'),
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // TODO: В проде уменьшить
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true
      // TODO: Сделать норм безопасность
      // secure: true,
      // sameSite: "strict",
    }
  })
};
