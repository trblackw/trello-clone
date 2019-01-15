const { secrets } = require("../config/keys"),
  jwt = require("jsonwebtoken");

const newToken = user => {
  const token = jwt.sign(
    { username: user.username, _id: user._id },
    secrets.jwt,
    {
      expiresIn: secrets.jwtExp
    }
  );
  return token;
};

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, secrets.jwt, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "invalid token"
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token not supplied"
    });
  }
};

module.exports = { newToken, verifyToken };
