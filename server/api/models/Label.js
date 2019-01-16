const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const labelSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  color: {
    type: String,
    match: /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i,
    default: "#3397FF"
  }
});

const Label = mongoose.model("Label", labelSchema);

module.exports = Label;
