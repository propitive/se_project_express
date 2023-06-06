const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { handleError, ERROR_CODES } = require("../utils/errors");

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(ERROR_CODES.Unauthorized)
        .send({ message: "Authorization required" });
    }

    const token = authorization.replace("Bearer ", "");
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res
        .status(ERROR_CODES.Unauthorized)
        .send({ message: "Authorization required" });
    }
    req.user = payload;
    next();
  } catch (err) {
    handleError(err, res);
  }
};
