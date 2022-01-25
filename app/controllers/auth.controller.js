const { httpError } = require("../helpers/handleError");
const { encrypt, compare } = require("../helpers/handleBcrypt");
const { tokenSign } = require("../helpers/generateToken");
const userModel = require("../models/users.model");
const { matchedData } = require("express-validator");

const loginCtrl = async (req, res) => {
  try {
    const { nickName, password } = req.body;
    const user = await userModel.findOne({ nickName: nickName });
    if (!user) {
      res.status(404).send({ error: "User not found" });
    }

    // const checkPassword = await compare(password, user.password);
    const checkPassword = (await password) == user.password ? true : false;

    // JWT
    const tokenSession = await tokenSign(user);

    if (checkPassword) {
      res.send({
        data: {
          name: user.name,
          nickName: user.nickName,
          email: user.email,
        },
        tokenSession,
      });
      return;
    }

    if (!checkPassword) {
      res.status(409).send({ error: "Invalid password" });
    }
  } catch (error) {
    httpError(res, error);
  }
};

const registerCtrl = async (req, res) => {
  try {
    // req = matchedData(req);
    const { nickName } = req.body;
    const userExist = await userModel.findOne({ nickName: nickName });

    if (userExist) {
      return res.status(422).send({ error: "User already exists" });
    }

    // const passwordHash = await encrypt(req.password);
    // req.password = passwordHash;
    const registerUser = await new userModel(req.body).save();
    
    return res.send(registerUser);
  } catch (err) {
    return httpError(res, err);
  }
};

const returnToken = (user = {}) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

// Test
const getTest = (req, res) => {
  res.send("uwu");
};

module.exports = { loginCtrl, registerCtrl, getTest };
