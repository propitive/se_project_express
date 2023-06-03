const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  // getUsers,
  // getUser,
  // createUser,
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/user");

// CRUD

// CREATE
// router.post("/", createUser);

// READ
// router.get("/", getUsers);
// router.get("/:itemId", getUser);
router.get("/me", auth, getCurrentUser);

// UPDATE
router.patch("/me", auth, updateCurrentUser);

module.exports = router;
