const Joi = require("joi");
const mongoose = require("mongoose");

const Note = mongoose.model(
  "Notes",
  new mongoose.Schema({
    note: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    date: {
      type: Date,
      required: true
    },
    user: {
      type: String,
      minlength: 1,
      maxlength: 1000,
      required: true
    }
  })
);

function validateNote(note) {
  const schema = {
    note: Joi.number()
      .min(0)
      .max(5)
      .required()
  };

  return Joi.validate(note, schema);
}

exports.Note = Note;
exports.validate = validateNote;
