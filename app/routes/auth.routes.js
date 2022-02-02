const express = require("express");
const router = express.Router();
const { validateCreate } = require('../validators/validateUser');

const { loginCtrl, registerCtrl } = require("../controllers/auth.controller");

//TODO: Login
router.post('/login', loginCtrl);

//TODO: Register
router.post('/register', validateCreate, registerCtrl);

module.exports = router;