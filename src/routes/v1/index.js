const express = require("express");
const router = express.Router();

const {InfoController} = require("../../controllers");
const userRoutes = require('./user-routes');


// localhost:4000/api/v1
router.get('/health', InfoController.health);
router.use('/users', userRoutes);  //localhost:4000/api/v1/users


module.exports = router;