const mongoose = require("mongoose"),
  Joi = require("joi");

const taskSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    assigned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

// const validateTask = task => {
//    const { author, assigned, _id } = task;

// };

// if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
//    return res.status(400).send("Invalid object id");
// }
