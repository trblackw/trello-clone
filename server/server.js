const express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  path = require("path"),
  cors = require("cors"),
  connect = require("./utils/db"),
  { json, urlencoded } = require("body-parser");

const userRoutes = require("./api/routes/user");
const boardRoutes = require("./api/routes/board");

mongoose.promise = global.Promise;
mongoose.set("debug", true);
const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(express.static(path.join(__dirname + "client/public")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, GET");
    return res.status(200).json({});
  }
  next();
});

//configure routes
app.use("/user", userRoutes);
app.use("/user/:id/boards", boardRoutes);

const port = process.env.PORT || 8080;

app.get("*", (req, res) => {
  res.send("Oooops", 404);
});

(async () => {
  try {
    await connect();
    app.listen(port, () =>
      console.log(`Server running on http//localhost:${port}`)
    );
  } catch (error) {
    console.error(error);
  }
})();
