const router = require("express").Router();
const User = require("./user");
const clothingItem = require("./clothingItem");
const { login, createUser } = require("../controllers/user");
const {
  createUserValidation,
  loginValidation,
} = require("../middlewares/validation");
const { NotFoundError } = require("../errors/not-found-error");

router.post("/signup", createUserValidation, createUser);
router.post("/signin", loginValidation, login);

router.use("/items", clothingItem);
router.use("/users", User);

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

module.exports = router;
