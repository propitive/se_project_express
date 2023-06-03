const router = require("express").Router();
const User = require("./user");
const clothingItem = require("./clothingItem");
const { login, createUser } = require("../controllers/user");

router.post("/signup", createUser);
router.post("/signin", login);

router.use("/items", clothingItem);
router.use("/users", User);

router.use((req, res) => {
  res.status(401).send({ message: "Requested resource not found" });
});

module.exports = router;
