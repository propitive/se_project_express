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

const {
  createItemValidation,
  idValidation,
} = require("../middlewares/validation");

// CRUD

// CREATE
router.post("/", auth, createItemValidation, createItem);

// UPDATE
router.put("/:itemId", auth, idValidation, updateItem);
router.put("/:itemId/likes", auth, idValidation, likeItem);

// DELETE
router.delete("/:itemId", auth, idValidation, deleteItem);
router.delete("/:itemId/likes", auth, idValidation, dislikeItem);

// READ
router.get("/", getItems);

module.exports = router;
