const express = require('express');
const passport = require('passport');
const controller = require('./auth.controller');
const { isAuthenticatedMiddleware } = require('./auth.config');

const router = express.Router();

router
  .post('/login', passport.authenticate('json'), controller.login)
  .get('/logout', isAuthenticatedMiddleware, controller.logout);

module.exports = router;
