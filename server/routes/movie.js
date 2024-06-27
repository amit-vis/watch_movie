const express = require('express');
const router = express.Router();
const movieController = require("../controller/movie_controller");

router.post("/add", movieController.create);
router.get("/view", movieController.getMovie);
router.patch("/watch-toggle/:id", movieController.toggleWatch);
router.put("/update/:id", movieController.editDetails);
router.get("/view-id/:id", movieController.getDataById);
router.delete("/delete/:id", movieController.delete);

module.exports = router;