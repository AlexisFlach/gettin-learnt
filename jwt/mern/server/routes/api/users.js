const express = require('express');
const router = express.Router();
const Controller = require('../../controllers/users')

router.post('/',
  Controller.usersRoute)

module.exports = router;