const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  Joi = require("joi");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  organization: {
    type: String,
    default: "Project Shift"
  },
  password: { type: String, required: true }
});

const validateUser = user => {
  const schema = {
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .alphanum()
      .min(6)
      .max(20)
      .required(),
    organization: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
  };
  return Joi.validate(user, schema);
};

const User = mongoose.model("User", userSchema);

module.exports = { User, validateUser };
