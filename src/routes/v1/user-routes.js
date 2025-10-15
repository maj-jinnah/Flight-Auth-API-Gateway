
const router = require('express').Router();
const { UserController } = require('../../controllers');
const { AuthMiddleware } = require('../../middlewares');


router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.post('/role', AuthMiddleware.checkAuth, AuthMiddleware.isAdmin, UserController.addRoleToUser);

module.exports = router;