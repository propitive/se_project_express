const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateClothingItemBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

const validateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.empty": 'The "name" field must be filled in',
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().min(8).messages({
      "string.empty": 'The "password" field must be filled in',
      "any.required": "You must input a password",
    }),
  }),
});

const validateUserLogInAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().min(8).messages({
      "string.empty": 'The "password" field must be filled in',
      "any.required": "You must input a password",
    }),
  }),
});

const ValidateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().messages({
      "string.empty": 'The "cardId" field must be filled in',
      "string.length": 'The length of "cardId" must be 24 characters',
      "string.hex": 'The "cardId" must be a hexadecimal string',
    }),
  }),
});

const ValidateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().messages({
      "string.empty": 'The "userId" field must be filled in',
      "string.length": 'The length of "userId" must be 24 characters',
      "string.hex": 'The "userId" must be a hexadecimal string',
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  validateClothingItemBody,
  validateUserInfoBody,
  validateUserLogInAuthentication,
  ValidateCardId,
  ValidateUserId,
};
