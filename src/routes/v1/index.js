const express = require("express");
const router = express.Router();

const {InfoController} = require("../../controllers");


// localhost:4000/api/v1

router.get('/health', InfoController.health);


module.exports = router;