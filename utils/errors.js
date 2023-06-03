const ERROR_CODES = {
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  AlreadyExistsError: 409,
  DefaultError: 500,
  MongoError: 11000,
};

const handleOnFailError = () => {
  const error = new Error("No item found");
  error.statusCode = 400;
  throw error;
};

const handleError = (err, res) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    res
      .status(ERROR_CODES.BadRequest)
      .send({ message: "Bad Request, Invalid input" });
  } else if (err.statusCode === 401 || err.name === "Error") {
    res
      .status(ERROR_CODES.Unauthorized)
      .send({ message: "You are not authorized to do this" });
  } else if (err.statusCode === 403) {
    res.status(ERROR_CODES.Forbidden).send({ message: "This is forbidden" });
  } else if (err.statusCode === 404) {
    res.status(ERROR_CODES.NotFound).send({ message: "Item not found" });
  } else if (err.statusCode === 409) {
    res
      .status(ERROR_CODES.AlreadyExistsError)
      .send({ message: "Email already exists" });
  } else if (err.statusCode === 11000) {
    res.status(ERROR_CODES.MongoError).send({ message: "Database error" });
  } else {
    res
      .status(ERROR_CODES.DefaultError)
      .send({ message: "Something went wrong" });
  }
};

module.exports = {
  ERROR_CODES,
  handleOnFailError,
  handleError,
};
