const { Note, validate } = require("../models/note");
const auth = require("../middlewares/auth");
// const admin = require("../middleware/admin");
const { getObjDate } = require("../scripts/dateFinder");
const moment = require("moment");
const express = require("express");
const router = express.Router();

// GET ALL NOTES
router.get("/", async (req, res) => {
  const notes = await Note.find()
    .select("-__v -user")
    .sort("date");

  // Send notes to client
  res.send(notes);
});

// GET ALL NOTES FROM AN USERID
router.get("/mine", [auth], async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort("date");

  res.send(notes);
});

// GET CURRENT WEEK NOTES FROM AN USER
router.get("/mine/week", [auth], async (req, res) => {
  var date = getObjDate();

  const notes = await Note.find({
    user: req.user._id,
    week: date.week,
    year: date.year
  }).select("-__v");

  res.send(notes);
});

// GET CURRENT MONTH NOTES FROM AN USER
router.get("/mine/month", [auth], async (req, res) => {
  var date = getObjDate();

  const notes = await Note.find({
    user: req.user._id,
    month: date.week,
    year: date.year
  }).select("-__v");

  res.send(notes);
});

// GET CURRENT YEAR NOTES FROM AN USER
router.get("/mine/month", [auth], async (req, res) => {
  var date = getObjDate();

  const notes = await Note.find({
    user: req.user._id,
    year: date.year
  }).select("-__v");

  res.send(notes);
});

// POST NEW NOTE
router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  var date = getObjDate();

  const note = new Note({
    user: req.user._id,
    value: req.body.value,
    fullDate: moment().toJSON(),
    year: date.year,
    month: date.month,
    week: date.week,
    day: date.day
  });

  await note.save();

  res.send(note);
});

// UPDATE NOTE
router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(res.body);
  if (error) return res.status(400).send("Invalid note");

  const note = await Note.findByIdAndUpdate(
    req.params.id,
    {
      note: req.body.note
    },
    { new: true }
  ).select("-password");

  if (!note)
    return res.status(404).send("The note with the given ID was not found.");
  res.send(note);
});

module.exports = router;
