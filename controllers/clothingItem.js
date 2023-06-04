const ClothingItem = require("../models/clothingItem");
const { handleOnFailError, handleError } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
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
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      handleOnFailError();
    })
    .then((item) => {
      if (item.owner.equals(req.user._id)) {
        return res
          .status(200)
          .send({ message: `The item has been successfully deleted.` });
      }
      return res.status(403).send({
        message: "You do not have permission to delete another users item",
      });
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail(() => {
      handleError(err, res);
      handleOnFailError();
    })
    .then(() =>
      res.status(200).send({ message: "Item has successfully been liked" })
    )
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
    .then((item) => res.status(200).send({ data: item }))
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

//////////////////////////////////////////////////////////////////////////////////////////////////

// function handleRegularItemMethod(req, res, err) {
//   if (err.name === "ValidationError" || err.name === "AssertionError") {
//     return res.status(errorCode400).send({
//       message:
//         "Invalid data passed to the methods for creating an item or updating an item, or invalid ID passed to the params.",
//     });
//   }
//   if (err.name === "CastError") {
//     return res.status(errorCode404).send({
//       message:
//         "There is no clothing item with the requested id, or the request was sent to a non-existent address.",
//     });
//   }
//   return res
//     .status(errorCode500)
//     .send({ message: "An error has occurred on the server", err });
// }

// function handleFindByIdItemCatchMethod(req, res, err) {
//   if (
//     err.name === "CastError" ||
//     err.name === "ValidationError" ||
//     err.name === "AssertionError"
//   ) {
//     return res.status(errorCode400).send({
//       message:
//         "Invalid data passed to the methods for creating an item or updating an item, or invalid ID passed to the params.",
//     });
//   }
//   if (err.name === "DocumentNotFoundError") {
//     return res.status(errorCode404).send({
//       message:
//         "There is no clothing item with the requested id, or the request was sent to a non-existent address.",
//     });
//   }
//   return res
//     .status(errorCode500)
//     .send({ message: "An error has occurred on the server", err });
// }
