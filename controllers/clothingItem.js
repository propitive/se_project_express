const ClothingItem = require("../models/clothingItem");
const {
  handleOnFailError,
  handleError,
  ERROR_CODES,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
    isLiked: false,
  })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const getItems = (req, res) => {
  ClothingItem.find()
    .then((items) => res.status(200).send({ data: items }))
    .catch((err) => {
      handleError(err, res);
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.param;
  const { imageUrl } = req.body;

  ClothingItem.findOneAndUpdate(itemId, { $set: { imageUrl } })
    .orFail(() => {
      handleOnFailError();
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      handleError(err, res);
    });
};

const deleteItem = (req, res) => {
  ClothingItem.findById(req.params.itemId)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return res
          .status(ERROR_CODES.Forbidden)
          .send({ message: "You are not authorized to delete this item" });
      }
      return item.deleteOne().then(() => {
        res.send({ message: "Item deleted" });
      });
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(ERROR_CODES.NotFound).send({ message: "Item not found" });
      } else if (err.name === "CastError") {
        res
          .status(ERROR_CODES.BadRequest)
          .send({ message: "Bad Request and/or invalid input" });
      } else {
        res
          .status(ERROR_CODES.DefaultError)
          .send({ message: "Something went wrong" });
      }
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail(() => {
      handleOnFailError();
    })
    .then((item) => {
      const isLiked = item.likes.includes(req.user._id);

      res.status(200).send({ data: { ...item.toObject(), isLiked } });
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail(() => {
      handleOnFailError();
    })
    .then((item) => {
      const isLiked = item.likes.includes(req.user._id);

      res.status(200).send({ data: { ...item.toObject(), isLiked } });
    })
    .catch((err) => {
      handleError(err, res);
    });

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
