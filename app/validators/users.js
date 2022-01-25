const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

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

module.exports = { validateCreate };

//     check('lastName')
//     .exists()
//     .isNumeric()
//     .custom((value, { req }) => {
    
//         if (value < 18 || value > 40) {
//             throw new Error('Rango de edad debe ser entre 18 y 40')
//         }
//         return true
//     })
