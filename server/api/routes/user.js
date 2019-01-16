const router = require("express").Router(),
  {Types} = require("mongoose"),
  bcrypt = require("bcrypt"),
  { Task, validateTask } = require("../models/Task"),
  { verifyToken, newToken } = require("../../utils/token");

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
    bcrypt.hash(password, 10, async (error, hash) => {
      if (error) {
        res.status(500).json({ error });
        return next();
      }
      try {
        user = await User.create({
          username,
          email,
          password: hash
        });
        if (user) {
          res.status(201).json({
            message: `${user.username}'s account was successfully created`,
            success: true,
            user
          });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error });
      }
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
      const token = newToken(user);
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

router.get("/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;
  let user = await User.findById(id);

  if (!user) {
    res.status(400).json({
      message: "Unable to find user account",
      success: false
    });
    return next();
  }
  res.json({
    message: "found the user",
    success: true,
    user
  });
});

module.exports = router;
