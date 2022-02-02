const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateCreate = [
  check("_idUser")
    .exists()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      return value.length == 24 ? true : Promise.reject("ID is not a valid");
    }),
  check("comment").exists().not().isEmpty(),
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
      return value.length == 24 ? true : Promise.reject("ID not valid");
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateNickName = [
  check("nickName").exists().not().isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateComment = [
  check("idComment")
    .exists()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      return value.length > 0
        ? true
        : Promise.reject("Debe tener mas de un caracter");
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validatePageTwit = [
  check("page")
    .exists()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      return value.length > 0 ? true : Promise.reject("Debe ser mayor a 0");
    }),
  check("idTwit")
    .exists()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      return value.length == 24 ? true : Promise.reject("ID not valid");
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validateCreate,
  validateID,
  validateComment,
  validateNickName,
  validatePageTwit,
};
