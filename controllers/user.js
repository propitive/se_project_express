const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { handleOnFailError, handleError } = require("../utils/errors");

// const createUser = (req, res) => {
//   const { name, avatar, email, password } = req.body;

//   bcrypt.hash(password, 10).then((hash) => {
//     User.create({ name, avatar, email, password: hash })
//       .then((user) => {
//         const userData = user.toObject();
//         delete userData.password;
//         return res.status(201).send({ data: userData });
//       })
//       .catch((err) => handleError(err, res));
//   });
// };

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        bcrypt.hash(password, 10).then((hash) => {
          User.create({ name, avatar, email, password: hash })
            .then((user) => {
              const userData = user.toObject();
              delete userData.password;
              return res.status(201).send({ data: userData });
            })
            .catch((err) => handleError(err, res));
        });
      }

      throw new Error(
        "Email address is already being used, please try another email"
      );
    })
    .catch((err) => {
      if (err.name === "MongoServerError") {
        const error = new Error("User with this email already exists");
        error.statusCode = 11000;
        handleError(err, res);
      }
    });
  // .then((user) => res.send(user))
  // .catch((err) => {
  //   handleError(err, res);
  // });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      handleOnFailError();
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      handleError(err, res);
    });
};

const updateCurrentUser = (req, res) => {
  const { name, avatar, _id } = req.body;
  User.findByIdAndUpdate(
    { _id },
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      handleOnFailError();
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jet.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
      });
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports = {
  // getUsers,
  getCurrentUser,
  updateCurrentUser,
  login,
  createUser,
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const createUser = (req, res) => {
//   const { name, avatar, email, password } = req.body;

//   bcrypt.hash(password, 10).then((hash) =>
//     User.create({
//       name,
//       avatar,
//       email,
//       password: hash,
//     })
//       .then(console.log("createUser process is running"))
//       .then((user) => {
//         res.send({ data: user });
//       })
//       .catch((err) => {
//         if (err.name === "MongoServerError") {
//           const error = new Error("User with this email already exists");
//           error.statusCode = 11000;
//           handleError(err, res);
//         }
//       })
//       .then((user) => res.send(user))
//       .catch((err) => {
//         handleError(err, res);
//       })
//   );
// };

// const createUser = (req, res) => {
//   const { name, avatar, email, password } = req.body;

//   User.findOne({ email })
//     .then((user) => {
//       if (!user) {
//         bcrypt.hash(password, 10).then((hash) =>
//           User.create({
//             name,
//             avatar,
//             email,
//             password: hash,
//           })
//             .then((user) => {
//               res.send({ data: user });
//             })
//             .catch((err) => {
//               handleError(err, res);
//             })
//         );
//       }

//       throw new Error(
//         "Email address is already being used, please try another email"
//       );
//     })
// .catch((err) => {
//   if (err.name === "MongoServerError") {
//     const error = new Error("User with this email already exists");
//     error.statusCode = 11000;
//     handleError(err, res);
//   }
// })
// .then((user) => res.send(user))
// .catch((err) => {
//   handleError(err, res);
// });
// };

// const getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.status(200).send(users))
//     .catch((err) => {
//       handleCatchMethod(req, res, err);
//     });
// };

// function handleCatchMethod(req, res, err) {
//   if (err.name === "ValidationError" || err.name === "AssertionError") {
//     return res.status(errorCode400).send({
//       message:
//         "Invalid data passed to the methods for creating an user or invalid ID passed to the params.",
//     });
//   }
//   if (err.name === "CastError") {
//     return res.status(errorCode404).send({
//       message:
//         "There is no user with the requested id, or the request was sent to a non-existent address",
//     });
//   }
//   return res
//     .status(errorCode500)
//     .send({ message: "An error has occurred on the server", err });
// }
