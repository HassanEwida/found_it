
const { router: authRouter } = require('./auth/router');
const { router: itemsRouter } = require('./items/router');
const { router: profileRouter } = require('./profile/router');

const authMiddleware = require('./middlewares/auth.middleware');

const router = (app) => {
  app.use('/auth', authRouter);
  app.use('/items', authMiddleware, itemsRouter);
  app.use('/profile', authMiddleware, profileRouter);
}

module.exports = { router };