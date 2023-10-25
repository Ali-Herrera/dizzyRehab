const cloudinary = require("../middleware/cloudinary");
const Exercise = require("../models/Exercise");
const Post = require("../models/Exercise");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const exercises = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { exercises: exercises, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const exercises = await Exercise.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { exercises: exercises });
    } catch (err) {
      console.log(err);
    }
  },
  getExercise: async (req, res) => {
    try {
      const exercise = await Exercise.findById(req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  createExercise: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Exercise.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        description: req.body.description,
        likes: 0,
        user: req.user.id,
      });
      console.log("Exercise has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likeExercise: async (req, res) => {
    try {
      await Exercise.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/exercise/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteExercise: async (req, res) => {
    try {
      // Find exercise by id
      let exercise = await Exercise.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(exercise.cloudinaryId);
      // Delete exercise from db
      await Exercise.remove({ _id: req.params.id });
      console.log("Deleted Exercise");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
