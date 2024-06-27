const express = require('express');
const router = express.Router();
const reviewController = require("../controller/review_controller");

router.post("/create/:id", reviewController.create);
router.patch("/update/:id", reviewController.update);
router.get("/view/:id", reviewController.getData);

module.exports = router;