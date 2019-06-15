const { Note, validate } = require("../models/note");
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
router.get("/:userid", async (req, res) => {
  const notes = await Note.find().select();
});

module.exports = router;
