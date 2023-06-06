const router = require("express").Router();
const User = require("./user");
const clothingItem = require("./clothingItem");
const { login, createUser } = require("../controllers/user");
const { ERROR_CODES } = require("../utils/errors");

router.post("/signup", createUser);
router.post("/signin", login);

router.use("/items", clothingItem);
router.use("/users", User);

router.use((req, res) => {
  res
    .status(ERROR_CODES.NotFound)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
