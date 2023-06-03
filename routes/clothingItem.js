const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// CRUD

// CREATE
router.post("/", auth, createItem);

// UPDATE
router.put("/:itemId", auth, updateItem);
router.put("/:itemId/likes", auth, likeItem);

// DELETE
router.delete("/:itemId", auth, deleteItem);
router.delete("/:itemId/likes", auth, dislikeItem);

// READ
router.get("/", getItems);

module.exports = router;
