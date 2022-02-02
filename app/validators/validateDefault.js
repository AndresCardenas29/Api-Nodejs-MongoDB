const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

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

module.exports = { validateID, validateNickName };
