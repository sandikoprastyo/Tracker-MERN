/* require router */
const router = require("express").Router();
/* require exercise model */
let Exercise = require("../models/exercise.model");

/* router  cbuat get req,res*/
router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

/* router buat /add post data */
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  /* new array */
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  /* variabel newExercise buat res exercise add jika berhasil res 200,
  err jika gagal res 400*/
  newExercise
    .save()
    .then(() => res.json("Exercise added in server..!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

/* End point API Requets */
/* router buat id untuk get */
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});
/* router untuk delete */
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted in server..!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

/* router untuk update */
router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise updated in server..!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

/* export module router*/
module.exports = router;
