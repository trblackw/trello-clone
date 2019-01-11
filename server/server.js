const express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  path = require("path"),
  cors = require("cors"),
  passport = require("passport");
const { json, urlencoded } = require("body-parser");

const LocalStrategy = require("passport-local").Strategy;

mongoose.promise = global.Promise;

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(express.static(path.join(__dirname + "client/public")));

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(`Server running on http//localhost:${port}`)
);
