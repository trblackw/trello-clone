const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  Joi = require("joi");

const taskSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      minlength: 10,
      maxlength: 500,
      required: true
    },
    priority: {
      type: String
    },
    assigned: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    labels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Label"
      }
    ]
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

const validateTask = task => {
  if (!mongoose.Types.ObjectId.isValid(task._id)) {
    throw new Error("Invalid task id");
  }
  const schema = {
    priority: Joi.string()
      .alphanum()
      .min(2)
      .max(20)
  };

  return Joi.validate(task, schema);
};

module.exports = { Task, validateTask };
