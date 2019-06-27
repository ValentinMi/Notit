const Joi = require("joi");
const mongoose = require("mongoose");

const Note = mongoose.model(
  "Notes",
  new mongoose.Schema({
    user: {
      type: String,
      minlength: 1,
      maxlength: 1000,
      required: true
    },
    value: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    fullDate: {
      type: Date,
      required: true
    },
    Year: {
      type: Number,
      required: true
    },
    Month: {
      type: Number,
      required: true
    }
  })
);

function validateNote(note) {
  const schema = {
    value: Joi.number()
      .min(0)
      .max(5)
      .required(),
    color: Joi.string()
  };

  return Joi.validate(note, schema);
}

exports.Note = Note;
exports.validate = validateNote;
