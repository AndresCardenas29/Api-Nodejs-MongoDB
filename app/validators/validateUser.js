const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");
const isImageURL = require("image-url-validator").default;

const validateNickName = [
  check("idUser")
    .exists()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      return value.length == 24 ? true : Promise.reject('ID not valid');
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateID = [
  check("idUser")
    .exists()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      return value.length == 24 ? true : Promise.reject('ID not valid');
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateCreate = [
  check("name").exists().not().isEmpty(),
  check("lastName").exists().not().isEmpty(),
  check("nickName").exists().not().isLength({ min: 5 }).isEmpty(),
  check("password").exists().not().isLength({ min: 5 }).isEmpty(),
  check("email").exists().isEmail(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validatePhoto = [
  check("photo").exists().not().isEmpty().isURL().custom( ( value, { req } ) => {
    if (!(isImageURL(value))) {
      return Promise.reject('Photo not valid');
    }else{
      return true;
    }
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  }
];

module.exports = { validateNickName, validateID, validateCreate, validatePhoto };
