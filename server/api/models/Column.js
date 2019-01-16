const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  Joi = require("joi");

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task"
      }
    ]
  },
  { timestamps: true }
);

const validateColumn = column => {
  if (!mongoose.Types.ObjectId.isValid(column._id)) {
    throw new Error("Invalid column id");
  }
  const schema = {
    title: Joi.string()
      .alphanum()
      .min(3)
      .max(50)
      .required(),
    category: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
  };

  return Joi.validate(column, schema);
};

const Column = mongoose.model("Column", columnSchema);

module.exports = { Column, validateColumn };
