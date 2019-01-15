const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  Joi = require("joi");

const boardSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    columns: [
      {
        type: Schema.Types.ObjectId,
        ref: "Column",
        default: { title: "My first board", category: "Fresh start", tasks: [] }
      }
    ],
    contributers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

const validateBoard = board => {
  if (!mongoose.Types.ObjectId.isValid(board._id)) {
    throw new Error("Invalid board id");
  }
};

const Board = mongoose.model("Board", boardSchema);

module.exports = { Board, validateBoard };
