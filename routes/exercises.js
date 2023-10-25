const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const exercisesController = require("../controllers/exercises");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, exercisesController.getExercise);

router.post("/createExercise", upload.single("file"), exercisesController.createExercise);

router.put("/likeExercise/:id", exercisesController.likeExercise);

router.delete("/deletePost/:id", exercisesController.deleteExercise);

module.exports = router;