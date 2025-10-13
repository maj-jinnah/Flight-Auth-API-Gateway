
const router = require('express').Router();
const { UserController } = require('../../controllers');


router.post('/signup', UserController.signup);

module.exports = router;