const express = require('express');
const router = express.Router();
const homeController = require("../controller/home_controller");

router.get("/", homeController.home);
router.use("/movie", require("./movie"));
router.use("/review", require("./review"))

module.exports = router;