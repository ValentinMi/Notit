const { Note, validate } = require("../models/note");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const moment = require("moment");
const express = require("express");
const router = express.Router();

// GET ALL NOTES
router.get("/", async (req, res) => {
  const notes = await Note.find()
    .select("-__v")
    .sort("date");

  // Send notes to client
  res.send(notes);
});

// GET ALL NOTES FROM AN USERID
router.get("/mine", [auth], async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort("date");

  res.send(notes);
});

// POST NEW NOTE
router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const note = new Note({
    note: req.body.note,
    date: moment().toJSON(),
    user: req.user._id
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
  );

  if (!note)
    return res.status(404).send("The note with the given ID was not found.");
  res.send(note);
});

module.exports = router;
