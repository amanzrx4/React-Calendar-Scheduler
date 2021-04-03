const express = require('express');
const router = express.Router();

const { createEvent , getEvent } = require('../controllers/event');

// const { validateSigninRequest , isRequestValidated } = require('../validators/user');

router
  .route('/create')

  .post( createEvent )

router
  .route('/details')

  .get( getEvent) 

module.exports = router;