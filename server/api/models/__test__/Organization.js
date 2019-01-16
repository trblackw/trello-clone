const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  Joi = require("joi");

const organizationSchema = new Schema({
  _id: Schema.Types.ObjectId,
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Board"
    }
  ],
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
