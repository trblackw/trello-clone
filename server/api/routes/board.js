const router = require("express").Router(),
  { Board, validateBoard } = require("../models/Board"),
  { User, validateUser } = require("../models/User"),
  { verifyToken } = require("../../utils/token");

router.get("/", verifyToken, async (req, res, next) => {
  const id = req.baseUrl.split("/")[2];

  let user = await User.findOne({ _id: id }).exec();
  if (!user) {
    res.json({
      message: "Something went wrong in server/api/routes/board.js",
      success: false
    });
  }
  let previousBoards = await Board.find({ owner: id }).populate({
    path: "columns",
    populate: { path: "tasks", populate: { path: "labels" } }
  });
  previousBoards.forEach(board =>
    board.columns.forEach(col => col.populate("tasks"))
  );
  if (!previousBoards.length) {
    let newBoard = await Board.create({ title: "First board", owner: id });
    res.json({
      message: "Couldnt find a board for user so one was created",
      success: true,
      boards: newBoard,
      user
    });
  }
  res.json({
    message: `User board count: ${previousBoards.length}`,
    success: true,
    boards: previousBoards
  });
});

module.exports = router;
