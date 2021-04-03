const express = require('express');
const router = express.Router();

const { signup , signin , signout} = require('../controllers/user');

const { validateSignupRequest , validateSigninRequest , isRequestValidated } = require('../validators/user');

router
  .route('/signin')

  .post(validateSigninRequest , isRequestValidated , signin )

router
  .route('/signup')

  .post(validateSignupRequest , isRequestValidated , signup) 

router
  .route('/signout')

  .post( signout) 

module.exports = router;