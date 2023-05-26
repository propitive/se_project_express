const ClothingItem = require("../models/clothingItem");
const { errorCode400, errorCode404, errorCode500 } = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(res.body);
  console.log(req.user._id); // _id will become accessible

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "AssertionError") {
        return res.status(errorCode400).send({
          message:
            "Invalid data passed to the methods for creating an item or updating an item, or invalid ID passed to the params.",
        });
      }
      if (err.name === "CastError") {
        return res.status(errorCode404).send({
          message:
            "There is no clothing item with the requested id, or the request was sent to a non-existent address",
        });
      } else {
        res
          .status(errorCode500)
          .send({ message: "An error has occurred on the server", err });
      }
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "AssertionError") {
        return res.status(errorCode400).send({
          message:
            "Invalid data passed to the methods for creating an item or updating an item, or invalid ID passed to the params.",
        });
      }
      if (err.name === "CastError") {
        return res.status(errorCode404).send({
          message:
            "There is no clothing item with the requested id, or the request was sent to a non-existent address",
        });
      } else {
        res
          .status(errorCode500)
          .send({ message: "An error has occurred on the server", err });
      }
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.param;
  const { imageUrl } = req.body;

  ClothingItem.findOneAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "AssertionError") {
        return res.status(errorCode400).send({
          message:
            "Invalid data passed to the methods for creating an item or updating an item, or invalid ID passed to the params.",
        });
      }
      if (err.name === "CastError") {
        return res.status(errorCode404).send({
          message:
            "There is no clothing item with the requested id, or the request was sent to a non-existent address",
        });
      } else {
        res
          .status(errorCode500)
          .send({ message: "An error has occurred on the server", err });
      }
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(console.log("THIS IS ON deleteItem"))
    .then(() => res.status(200).send({}))
    .catch((err) => {
      console.log(err.name);
      if (
        err.name === "CastError" ||
        err.name === "ValidationError" ||
        err.name === "AssertionError"
      ) {
        return res.status(errorCode400).send({
          message:
            "Invalid data passed to the methods for creating an item or updating an item, or invalid ID passed to the params.",
        });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(errorCode404).send({
          message:
            "There is no clothing item with the requested id, or the request was sent to a non-existent address",
        });
      } else {
        res
          .status(errorCode500)
          .send({ message: "An error has occurred on the server", err });
      }
    });
};

const likeItem = (req, res) => {
  console.log(req.params.itemId);
  console.log(req.user._id);
  return ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail((e) => {
      console.log("I HAVE FAILED THIS API", e);
    })
    .then(() => res.status(200).send({}))
    .catch((err) => {
      console.log("THIS IS ON likeItem", err.name);

      if (
        err.name === "CastError" ||
        err.name === "ValidationError" ||
        err.name === "AssertionError"
      ) {
        return res.status(errorCode400).send({
          message:
            "Invalid data passed to the methods for creating an item or updating an item, or invalid ID passed to the params.",
        });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(errorCode404).send({
          message:
            "There is no clothing item with the requested id, or the request was sent to a non-existent address",
        });
      } else {
        res
          .status(errorCode500)
          .send({ message: "An error has occurred on the server", err });
      }
    });
};

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail()
    .then(console.log("THIS IS ON dislikeItem"))
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.log("THIS IS ON dislikeItem", err.name);

      if (
        err.name === "CastError" ||
        err.name === "ValidationError" ||
        err.name === "AssertionError"
      ) {
        return res.status(errorCode400).send({
          message:
            "Invalid data passed to the methods for creating an item or updating an item, or invalid ID passed to the params.",
        });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(errorCode404).send({
          message:
            "There is no clothing item with the requested id, or the request was sent to a non-existent address",
        });
      } else {
        res
          .status(errorCode500)
          .send({ message: "An error has occurred on the server", err });
      }
    });

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
