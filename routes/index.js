const router = require("express").Router();
const User = require("./user");
const clothingItem = require("./clothingItem");
const { login, createUser } = require("../controllers/user");
const { ERROR_CODES } = require("../utils/errors");
const {
  createUserValidation,
  loginValidation,
} = require("../middlewares/validation");
const NotFoundError = require("../utils/errors");

router.post("/signup", createUserValidation, createUser);
router.post("/signin", loginValidation, login);

router.use("/items", clothingItem);
router.use("/users", User);

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

module.exports = router;
