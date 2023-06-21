const router = require("express").Router();
const auth = require("../middlewares/auth");

const { getCurrentUser, updateCurrentUser } = require("../controllers/user");

// CRUD

// CREATE

// READ
router.get("/me", auth, getCurrentUser);

// UPDATE
router.patch("/me", auth, updateCurrentUser);

module.exports = router;
