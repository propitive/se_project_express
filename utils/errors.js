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
  error.statusCode = 404;
  throw error;
};

const handleError = (err, res) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    res
      .status(ERROR_CODES.BadRequest)
      .send({ message: "Bad Request, Invalid input" });
  } else if (err.message === "Incorrect email or password") {
    res
      .status(ERROR_CODES.Unauthorized)
      .send({ message: "You are not authorized to do this" });
  } else if (err.statusCode === 404) {
    res.status(ERROR_CODES.NotFound).send({ message: "Item not found" });
  } else if (err.code === 11000) {
    res.status(ERROR_CODES.AlreadyExistsError).send({
      message: "Email address is already being used, please try another email.",
    });
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
