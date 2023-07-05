const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const { JWT_SECRET } = require("../utils/config");
require("dotenv").config();
const { JWT_SECRET } = process.env;
const {
  handleOnFailError,
  handleError,
  ERROR_CODES,
} = require("../utils/errors");
const {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
  NotFoundError,
} = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, avatar, email, password: hash })
      .then((user) => {
        const userData = user.toObject();
        delete userData.password;
        return res.status(201).send({ data: userData });
      })
      // .catch((err) => handleError(err, res));
      .catch(() => {
        next(
          new BadRequestError(
            "The request submitted in invalid. Please, try again."
          )
        );
      });
  });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      handleOnFailError();
    })
    .then((user) => res.status(200).send({ data: user }))
    // .catch((err) => {
    //   handleError(err, res);
    // });
    .catch(() => {
      next(
        new NotFoundError(
          "The requested user cannot be found. Please, try again."
        )
      );
    });
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      handleOnFailError();
    })
    .then((user) => {
      res.status(200).send(user);
    })
    // .catch((err) => {
    //   handleError(err, res);
    // });
    .catch(() => {
      next(
        new BadRequestError(
          "The request submitted in invalid. Please, try again."
        )
      );
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(ERROR_CODES.Unauthorized)
      .send({ message: "You are not authorized to do this" });
  }
  return (
    User.findUserByCredentials(email, password)
      .then((user) => {
        res.send({
          token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
        });
      })
      // .catch((err) => {
      //   console.log(err);
      //   console.log(err.name);
      //   handleError(err, res);
      // });
      .catch(() => {
        next(
          new NotFoundError(
            "The requested user cannot be found. Please, try again."
          )
        );
      })
  );
};

module.exports = {
  getCurrentUser,
  updateCurrentUser,
  login,
  createUser,
};
