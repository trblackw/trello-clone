const router = require("express").Router(),
  mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  { secrets } = require("../../config/keys"),
  jwt = require("jsonwebtoken");

//user model
const { User, validateUser } = require("../models/User");

//register new users
router.post(
  "/register",
  async ({ body: { username, email, password } }, res, next) => {
    let user = await User.findOne({ email }).exec();
    //check to make sure user doesn't already exist
    if (user) return res.status(409).json({ message: "Email already exists" });

    //validate user input fields
    const { error } = validateUser({ username, email, password });
    if (error) {
      res.status(400).send(`OOPS -- ${error.details[0].message}`);
      return next();
    }
    //all is well, hash the new user's password
    bcrypt.hash(password, 10, (error, hash) => {
      if (error) {
        res.status(500).json({ error });
        return next();
      }
      User.create(
        {
          _id: new mongoose.Types.ObjectId(),
          username,
          email,
          password: hash
        },
        (error, user) => {
          if (error) return res.status(500).json({ error });
          if (user)
            return res.status(201).json({
              message: `${user.username}'s account was successfully created`
            });
        }
      );
    });
  }
);

//login in users
router.post("/login", async ({ body: { username, password } }, res, next) => {
  let user = await User.findOne({ username });
  if (!user) {
    res
      .status(401)
      .json({ message: "AUTH FAILED, we were unable to find your account" });
    return next();
  }
  bcrypt.compare(password, user.password, (error, result) => {
    if (error) {
      res.status(401).send({
        message: "AUTH FAILED -- invalid username & password combo",
        success: false,
        error
      });
      return next();
    }
    if (result) {
      const token = jwt.sign(
        { username: user.username, _id: username._id },
        secrets.jwt,
        { expiresIn: secrets.jwtExp }
      );
      return token
        ? res.status(200).json({
            message: "Successful login",
            success: true,
            token,
            user
          })
        : res.status(401).json({
            message: "Failure to login",
            success: false
          });
    }
  });
});

module.exports = router;
