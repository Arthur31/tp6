const express = require('express');
const { AppError, AppErrorTypes } = require('./error/error');
const authRouter = require('./auth/auth.router');
const bookRouter = require('./book/book.router');

const router = express.Router();

router
  .use('/auth', authRouter)
  .use('/books', bookRouter)
  .use('/crash', () => process.exit(1))
  .use('*', (req, res, next) => {
    const error = new AppError(AppErrorTypes.RESOURCE_NOT_FOUND, `No resource ${req.baseUrl} has been found`);
    next(error);
  });

module.exports = router;
