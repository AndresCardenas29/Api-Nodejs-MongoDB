const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");
const isImageURL = require("image-url-validator").default;

const validateTwit = [
  check("_idUser")
    .exists()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      return value.length == 24 ? true : Promise.reject("ID not valid");
    }),
  check("twitText").exists().not().isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateUpdateTwit = [
  check("_id")
    .exists()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      return value.length == 24 ? true : Promise.reject("ID not valid");
    }),
  check("twitText").exists().not().isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateCreateTwit = [
  check("_idUser")
    .exists()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      return value.length == 24 ? true : Promise.reject("ID not valid");
    }),
  check("twitText")
    .exists()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      return value.length > 0
        ? true
        : Promise.reject("debe tener 1 o mas de un caracteres");
    }),
  check("photo")
    .exists()
    .custom((value, { req }) => {
      return isImageURL(value) ? true : Promise.reject("invalid photo");
    }),
  check("gift")
    .exists()
    .custom((value, { req }) => {
      return isImageURL(value) ? true : Promise.reject("invalid gift");
    }),
  check("ubication").exists().not().isEmpty,
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

validateGetTwitFollowing = [
  check("initialUsers").exists().not().isEmpty(),
  check("amountUsers").exists().not().isEmpty(),
  check("amountTwits").exists().not().isEmpty(),
  check("nickName")
    .exists()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      return value.length == 24 ? true : Promise.reject("ID is not a valid");
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validateTwit,
  validateCreateTwit,
  validateUpdateTwit,
  validateGetTwitFollowing,
};
