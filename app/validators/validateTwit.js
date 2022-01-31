const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

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

module.exports = { validateTwit }