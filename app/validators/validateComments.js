const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateCreate = [
  check("_idUser")
    .exists()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      return value.length == 24 ? true : Promise.reject('ID is not a valid');
    }),
  check("comment").exists().not().isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreate };
