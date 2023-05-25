const User = require("../models/user");
const { errorCode400, errorCode404, errorCode500 } = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "AssertionError") {
        return res.status(errorCode400).send({
          message:
            "Invalid data passed to the methods for creating an user or invalid ID passed to the params.",
        });
      }
      if (err.name === "CastError") {
        return res.status(errorCode404).send({
          message:
            "There is no user with the requested id, or the request was sent to a non-existent address",
        });
      }
      res
        .status(errorCode500)
        .send({ message: "An error has occurred on the server", err });
    });
};

const getUser = (req, res) => {
  const { itemId } = req.params;

  User.findById(itemId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      console.log(err);
      console.log(err.name);

      if (err.name === "DocumentNotFoundError") {
        return res.status(errorCode404).send({
          message:
            "There is no user with the requested id, or the request was sent to a non-existent address",
        });
      }
      if (
        err.name === "ValidationError" ||
        err.name === "AssertionError" ||
        err.name === "CastError"
      ) {
        return res.status(errorCode400).send({
          message:
            "Invalid data passed to the methods for creating an user or invalid ID passed to the params.",
        });
      }
      res
        .status(errorCode500)
        .send({ message: "An error has occurred on the server", err });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      console.log(user);
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "AssertionError") {
        return res.status(errorCode400).send({
          message:
            "Invalid data passed to the methods for creating an user or invalid ID passed to the params.",
        });
      }
      if (err.name === "CastError") {
        return res.status(errorCode404).send({
          message:
            "There is no user with the requested id, or the request was sent to a non-existent address",
        });
      }
      res
        .status(errorCode500)
        .send({ message: "An error has occurred on the server", err });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};

// Ignore what is under this

// if (err.name === "ValidationError" || "AssertionError")
// return res.status(errorCode400).send({
//   message:
//     "Invalid data passed to the methods for creating an user or invalid ID passed to the params.",
// });
// if (err.name === "CastError")
// return res.status(errorCode404).send({
//   message:
//     "There is no user with the requested id, or the request was sent to a non-existent address",
// });
