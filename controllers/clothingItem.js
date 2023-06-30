const ClothingItem = require("../models/clothingItem");
const {
  handleOnFailError,
  handleError,
  ERROR_CODES,
} = require("../utils/errors");
const {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
  NotFoundError,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => {
      res.send({ data: item });
    })
    // .catch((err) => {
    //   handleError(err, res);
    // });
    .catch(() => {
      next(
        new BadRequestError(
          "The request to create an item is invalid. Please, try again."
        )
      );
    });
};

const getItems = (req, res) => {
  ClothingItem.find()
    .sort({ createdAt: -1 })
    .then((items) => res.status(200).send({ data: items }))
    // .catch((err) => {
    //   handleError(err, res);
    // });
    .catch(() => {
      next(
        new NotFoundError(
          "The requested items cannot be found. Please, try again."
        )
      );
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
    // .catch((err) => {
    //   handleError(err, res);
    // });
    .catch(() => {
      next(
        new UnauthorizedError(
          "You are not authorized to update this item. Please, update items that you have created."
        )
      );
    });
};

const deleteItem = (req, res) => {
  ClothingItem.findById(req.params.itemId)
    .orFail(() => {
      // const error = new Error("Item ID not found");
      // error.statusCode = 404;
      // throw error;

      throw UnauthorizedError("Item ID not found");
    })
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        throw new ForbiddenError(
          "You are not allowed to delete this item, because you did not create this item."
        );
      }
      return item.deleteOne().then(() => {
        res.send({ message: "Item deleted" });
      });
    })
    // .catch((err) => {
    //   if (err.statusCode === 404) {
    //     res.status(ERROR_CODES.NotFound).send({ message: "Item not found" });
    //   } else if (err.name === "CastError") {
    //     res
    //       .status(ERROR_CODES.BadRequest)
    //       .send({ message: "Bad Request and/or invalid input" });
    //   } else {
    //     res
    //       .status(ERROR_CODES.DefaultError)
    //       .send({ message: "Something went wrong" });
    //   }
    // });
    .catch(() => {
      next();
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
      res.status(200).send({ data: { ...item.toObject() } });
    })
    // .catch((err) => {
    //   handleError(err, res);
    // });
    .catch(() => {
      next(new ConflictError("Something went wrong. Please, try again later."));
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
      res.status(200).send({ data: { ...item.toObject() } });
    })
    // .catch((err) => {
    //   handleError(err, res);
    // });
    .catch(() => {
      next(new ConflictError("Something went wrong. Please, try again later."));
    });

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
