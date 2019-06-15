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
    userid: {
      type: String,
      required: true
    }
  })
);

function validateNote(note) {
  const schema = {
    note: Joi.number()
      .min(0)
      .max(5)
      .required(),
    date: Joi.date().required(),
    userId: Joi.objectId().required()
  };

  return Joi.validate(note, schema);
}

exports.Note = Note;
exports.validate = validateNote;
