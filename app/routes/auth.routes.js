const express = require("express");
const router = express.Router();

const { loginCtrl, registerCtrl, getTest } = require("../controllers/auth.controller");

//TODO: Login
router.post('/login', loginCtrl);

//TODO: Register
router.post('/register', registerCtrl);

router.get('/', getTest);

module.exports = router;