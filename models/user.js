const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { UnauthorizedError } = require("../errors/unauthorized-error");

const user = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    role: { type: String, default: "Elise Bouer" },
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "You must enter a valid email",
    },
    role: {
      type: String,
      default:
        "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Elise.png",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

user.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((endUser) => {
      if (!endUser) {
        return Promise.reject(
          new UnauthorizedError("Incorrect email or password")
        );
      }

      return bcrypt.compare(password, endUser.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError("Incorrect email or password")
          );
        }

        return endUser;
      });
    });
};

module.exports = mongoose.model("user", user);
