const { Note, validate } = require("../models/note");
const auth = require("../middlewares/auth");
const { getObjDate } = require("../scripts/dateFinder");
const moment = require("moment");
const express = require("express");
const router = express.Router();

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

// GET ALL NOTES
router.get("/", async (req, res) => {
  const notes = await Note.find()
    .select("-__v -user")
    .sort("date");

  // Send notes to client
  res.send(notes);
});

//////////////////
// CURRENT DATA //
//////////////////

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
  })
    .select("-__v")
    .sort("day");

  res.send(notes);
});

// GET CURRENT MONTH NOTES FROM AN USER
router.get("/mine/month", [auth], async (req, res) => {
  var date = getObjDate();

  const notes = await Note.find({
    user: req.user._id,
    month: date.month,
    year: date.year
  })
    .select("-__v")
    .sort("week");
  res.send(notes);
});

// GET CURRENT YEAR NOTES FROM AN USER
router.get("/mine/year", [auth], async (req, res) => {
  var date = getObjDate();

  const notes = await Note.find({
    user: req.user._id,
    year: date.year
  })
    .select("-__v")
    .sort("month");

  res.send(notes);
});

///////////////////
// SPECIFIC DATA //
///////////////////

// GET NOTES WITH A GIVEN WEEK NUMBER
router.get("/mine/:year/:week", [auth], async (req, res) => {
  const notes = await Note.find({
    user: req.user._id,
    year: req.params.year,
    week: req.params.week
  })
    .select("-__v")
    .sort("dayInWeek");

  res.send(notes);
});

// GET NOTES WITH A GIVEN MONTH NUMBER
router.get("/mine/:year/:month", [auth], async (req, res) => {
  const notes = await Note.find({
    user: req.user._id,
    year: req.params.year,
    month: req.params.month
  })
    .select("-__v")
    .sort("dayInMonth");

  res.send(notes);
});

// GET NOTES WITH A GIVEN YEAR NUMBER
router.get("/mine/:year", [auth], async (req, res) => {
  const notes = await Note.find({
    user: req.user._id,
    year: req.params.year
  })
    .select("-__v")
    .sort("month");
});

module.exports = router;
