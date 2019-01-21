const mongoose = require("mongoose"),
  uniqueValidator = require("mongoose-unique-validator"),
  Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
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

organizationSchema.plugin(uniqueValidator)

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
