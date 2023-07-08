require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/constants");
const { handleError } = require("../utils/errors");
// const { UnauthorizedError } = require("../utils/errors");
const UnauthorizedError = require("../errors/unauthorized-error");

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(new UnauthorizedError("Authorization required"));
    }

    const token = authorization.replace("Bearer ", "");
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return next(new UnauthorizedError("Authorization required"));
    }
    req.user = payload;
    next();
  } catch (err) {
    handleError(err, res);
  }
};
